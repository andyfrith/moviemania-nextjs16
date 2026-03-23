"use server";

import { cookies } from "next/headers";
import { ollamaAI } from "@/app/lib/ai/ollama/service";
import type {
  MovieAnalysisResponse,
  MovieWatchAnalysisResponse,
} from "@/app/lib/ai/google/types";
import { Movie } from "./types";

/**
 * Runs Ollama on the server only (Node APIs; not usable in the browser bundle).
 */
export async function generateOllamaMovieAnalysis(
  title: string,
): Promise<MovieAnalysisResponse> {
  return ollamaAI.generateMovieAnalysis(title);
}

export async function generateOllamaMovieWatchAnalysis(
  mood: string[],
  genres: string[],
  title: string,
): Promise<MovieWatchAnalysisResponse> {
  return ollamaAI.generateMovieWatchAnalysis({ mood, genres, title });
}

export async function saveForLater(movie: Movie) {
  const cookieStore = await cookies();
  const movies = cookieStore.has("movies")
    ? cookieStore.get("movies")?.value.concat(
        "|",
        JSON.stringify({
          imdbID: movie.imdbID,
          Title: movie.Title,
          Year: movie.Year,
          Poster: movie.Poster,
        }),
      )
    : JSON.stringify({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
      });

  cookieStore.set("movies", movies!);
}

export async function removeSaveForLater(movie: Movie) {
  const cookieStore = await cookies();
  if (!cookieStore.has("movies")) {
    return;
  }

  const cookie = cookieStore.get("movies");
  // console.log("cookie", cookie);
  const valStrs = cookie?.value.split("|");
  // console.log("valStrs", valStrs);
  const valJSONs = valStrs?.map((s) => JSON.parse(s));
  // console.log("valJSONs", valJSONs);

  const valJSONsFiltered = valJSONs?.filter((v) => v.imdbID !== movie.imdbID);
  // console.log("valJSONsFiltered", valJSONsFiltered);

  if (valJSONsFiltered && valJSONsFiltered.length === 0) {
    cookieStore.delete("movies");
    return;
  }

  const valJSONsFilteredStrs = valJSONsFiltered?.map((s) => JSON.stringify(s));
  // console.log("valJSONsFilteredStrs", valJSONsFilteredStrs);
  const valJSONsFilteredStrsJoined = valJSONsFilteredStrs?.join("|");
  // console.log("valJSONsFilteredStrsJoined", valJSONsFilteredStrsJoined);
  cookieStore.set("movies", valJSONsFilteredStrsJoined!);
}

export async function getSavedForLater() {
  const cookieStore = await cookies();
  if (!cookieStore.has("movies")) {
    return null;
  }

  return cookieStore
    .get("movies")
    ?.value.split("|")
    .map((s) => JSON.parse(s) as Movie);
}
