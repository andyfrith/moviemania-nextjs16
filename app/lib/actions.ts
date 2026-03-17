"use server";

import { cookies } from "next/headers";
import { Movie } from "./types";

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

  return cookieStore.get("movies")?.value.split("|");
}
