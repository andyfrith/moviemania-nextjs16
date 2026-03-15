import { MovieByIdResponse, MoviesSearchResponse } from "./types";

export async function fetchMovies(
  s: string,
  currentPage: number,
  y?: string,
  type?: string,
) {
  try {
    const res = await fetch(
      process.env.OMDb_API_URL +
        `&s=${s}&type=movie&page=${currentPage}` +
        (y && `&y=${y}`) +
        (type && `&type=${type}`),
    );
    return (await res.json()) as MoviesSearchResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movies.");
  }
}

export async function fetchMovie(imdbID: string) {
  try {
    const res = await fetch(
      process.env.OMDb_API_URL + `&i=${imdbID}&plot=full`,
    );
    return (await res.json()) as MovieByIdResponse;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch movie.");
  }
}
