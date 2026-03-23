import { GoogleGenAI } from "@google/genai";
import {
  movie_analysis_prompt,
  movie_watch_analysis_prompt,
} from "../../prompts";
import {
  mock_movie_analysis_response,
  mock_movie_watch_analysis_response,
} from "./mock-response";
import { MovieAnalysisResponse, MovieWatchAnalysisResponse } from "./types";

export class Service {
  private genAI: GoogleGenAI;
  private model: string;

  private static instance: Service;

  private constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("Gemini API key not found. Using mock responses.");
      this.genAI = new GoogleGenAI({ vertexai: false, apiKey: "dummy-key" });
    } else {
      this.genAI = new GoogleGenAI({ vertexai: false, apiKey });
    }

    this.model = "gemini-3-flash-preview";
    console.log("Google Service created!");
  }

  public static getInstance(): Service {
    if (!Service.instance) {
      Service.instance = new Service();
    }
    return Service.instance;
  }

  async generateMovieAnalysis($title: string): Promise<MovieAnalysisResponse> {
    try {
      const response = await this.genAI.models.generateContent({
        model: this.model,
        contents: movie_analysis_prompt($title),
      });
      console.log("Gemini AI Movie Analysis response:", response);
      if (
        !response.candidates ||
        !response.candidates[0] ||
        !response.candidates[0].content ||
        !response.candidates[0].content.parts ||
        !response.candidates[0].content.parts[0] ||
        !response.candidates[0].content.parts[0].text
      ) {
        throw new Error("No text in response");
      }
      const text = response.candidates[0].content.parts[0].text;
      return Promise.resolve(JSON.parse(text) as MovieAnalysisResponse);
    } catch (error) {
      console.error("Gemini AI Movie Analysis error:", error);
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
      const response = await this.genAI.models.generateContent({
        model: this.model,
        contents: movie_watch_analysis_prompt({
          mood,
          genres,
          title,
        }),
      });
      console.log("Gemini AI Movie Watch Analysis response:", response);

      return Promise.resolve(
        JSON.parse(response.text!) as MovieWatchAnalysisResponse,
      );
    } catch (error) {
      console.error("Gemini AI Movie Watch Analysis error:", error);
      return Promise.resolve(mock_movie_watch_analysis_response);
    }
  }
}

export const geminiAI = Service.getInstance();
