import axios, { AxiosInstance, AxiosResponse } from "axios";
import { MovieResponse, MovieDetails, Genre } from "@/app/lib/tmdb/types";

class Client {
  private api: AxiosInstance;
  private readonly baseURL: string;
  private readonly imageBaseURL: string;
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";
    this.baseURL =
      process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";
    this.imageBaseURL =
      process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ||
      "https://image.tmdb.org/t/p";

    if (!this.apiKey) {
      console.warn("⚠️ The TMDB API key is not configured.");
    }

    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 15000,
      params: {
        api_key: this.apiKey,
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        console.log(
          `🎬 [TMDB API] ${config.method?.toUpperCase()} ${config.url}`,
        );
        return config;
      },
      (error) => {
        console.error("❌ [TMDB API] Request error:", error);
        return Promise.reject(error);
      },
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(
          `✅ [TMDB API] Response received for ${response.config.url}`,
        );
        return response;
      },
      (error) => {
        console.error(
          "❌ [TMDB API] Response error:",
          error.response?.data || error.message,
        );
        return Promise.reject(error);
      },
    );

    // console.log(this.api, this.baseURL, this.imageBaseURL, this.apiKey);
  }

  getImageUrl(path: string | null, size: string = "w500"): string | null {
    if (!path) return null;
    return `${this.imageBaseURL}/${size}${path}`;
  }

  async getTopRatedMovies(page: number = 1): Promise<MovieResponse> {
    const response = await this.api.get<MovieResponse>("/movie/top_rated", {
      params: { page },
    });
    return response.data;
  }

  async getMovieDetails(
    movieId: number,
    appendToResponse?: string[],
  ): Promise<MovieDetails> {
    const params: Record<string, string> = {};
    if (appendToResponse) {
      params.append_to_response = appendToResponse.join(",");
    }

    const response = await this.api.get<MovieDetails>(`/movie/${movieId}`, {
      params,
    });
    return response.data;
  }

  async getMovieGenres(): Promise<{ genres: Genre[] }> {
    const response = await this.api.get<{ genres: Genre[] }>(
      "/genre/movie/list",
    );
    return response.data;
  }

  async searchMovies(
    query: string,
    page: number = 1,
    options?: {
      include_adult?: boolean;
      language?: string;
      year?: number;
      primary_release_year?: number;
      region?: string;
    },
  ): Promise<MovieResponse> {
    const response = await this.api.get<MovieResponse>("/search/movie", {
      params: { query, page, ...options },
    });
    return response.data;
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.api.get("/configuration");
      return true;
    } catch {
      return false;
    }
  }
}

const client = new Client();
export default client;
