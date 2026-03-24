// import { Ollama } from "ollama";
import { Ollama } from "ollama/browser";
import {
  MovieAnalysisResponse,
  MovieWatchAnalysisResponse,
} from "../google/types";
import {
  movie_analysis_prompt,
  movie_watch_analysis_prompt,
} from "../../prompts";
import {
  mock_movie_analysis_response,
  mock_movie_watch_analysis_response,
} from "../google/mock-response";

export class Service {
  private ollama: Ollama;
  private model: string;

  private static instance: Service;

  private constructor() {
    this.ollama = new Ollama();
    this.model = "qwen3:8b";
    console.log("Ollama Service created!");
  }

  public static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  async generateMovieAnalysis($title: string): Promise<MovieAnalysisResponse> {
    try {
      const response = await this.ollama.generate({
        model: this.model,
        prompt: movie_analysis_prompt($title),
      });
      console.log("Ollama AI Movie Analysis response:", response);
      //   if (!response.response) {
      //     throw new Error("No response in response");
      //   }
      return Promise.resolve(
        JSON.parse(response.response) as MovieAnalysisResponse,
      );
    } catch (error) {
      console.error("Ollama AI Movie Analysis error:", error);
      return Promise.resolve(mock_movie_analysis_response);
    }
  }

  async generateMovieWatchAnalysis({
    mood,
    genres,
    title,
  }: {
    mood: Array<string>;
    genres: Array<string>;
    title: string;
  }): Promise<MovieWatchAnalysisResponse> {
    try {
      const response = await this.ollama.generate({
        model: this.model,
        prompt: movie_watch_analysis_prompt({ mood, genres, title }),
      });
      console.log("Ollama AI Movie Watch Analysis response:", response);
      if (!response.response) {
        throw new Error("No response in response");
      }
      return Promise.resolve(
        JSON.parse(response.response) as MovieWatchAnalysisResponse,
      );
    } catch (error) {
      console.error("Ollama AI Movie Watch Analysis error:", error);
      return Promise.resolve(mock_movie_watch_analysis_response);
    }
  }
}

export const ollamaAI = Service.getInstance();
