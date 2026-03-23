import axios, { AxiosInstance, AxiosResponse } from "axios";
import { MovieByIdResponse, MoviesSearchResponse } from "@/app/lib/types";

class Client {
  private api: AxiosInstance;
  private readonly baseURL: string;
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_OMDb_API_KEY || "";
    this.baseURL =
      process.env.NEXT_PUBLIC_OMDb_BASE_URL || "http://www.omdbapi.com";

    if (!this.apiKey) {
      console.warn("⚠️ The OMDb API key is not configured.");
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
          `🎬 [OMDb API] ${config.method?.toUpperCase()} ${config.url}`,
        );
        return config;
      },
      (error) => {
        console.error("❌ [OMDb API] Request error:", error);
        return Promise.reject(error);
      },
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(
          `✅ [OMDb API] Response received for ${response.config.url}`,
        );
        return response;
      },
      (error) => {
        console.error(
          "❌ [OMDb API] Response error:",
          error.response?.data || error.message,
        );
        return Promise.reject(error);
      },
    );
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    return false;
    // try {
    //   await this.api.get("/configuration");
    //   return true;
    // } catch {
    //   return false;
    // }
  }

  async searchMovies(
    s: string,
    currentPage: number,
    y?: string,
    type?: string,
  ): Promise<MoviesSearchResponse> {
    const response = await this.api.get<MoviesSearchResponse>("/", {
      params: { s, page: currentPage, y, type, apiKey: this.apiKey },
    });
    return response.data;
  }

  async getMovie(
    imdbID: string,
    plot: string = "full",
  ): Promise<MovieByIdResponse> {
    const response = await this.api.get<MovieByIdResponse>("/", {
      params: { i: imdbID, plot, apiKey: this.apiKey },
    });
    return response.data;
  }

  // async searchMovies2(
  //   query: string,
  //   page: number = 1,
  //   options?: {
  //     include_adult?: boolean;
  //     language?: string;
  //     year?: number;
  //     primary_release_year?: number;
  //     region?: string;
  //   },
  // ): Promise<MovieResponse> {
  //   const response = await this.api.get<MovieResponse>("/search/movie", {
  //     params: { query, page, ...options },
  //   });
  //   return response.data;
  // }
}

const client = new Client();
export default client;
