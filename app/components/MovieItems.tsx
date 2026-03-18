"use client";

import { Movie } from "@/app/lib/types";
import MovieItem from "@/app/components/MovieItem";

export default function MovieItems({ movies }: { movies: Array<Movie> }) {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 mt-10">
        {movies.map((movie) => (
          <MovieItem key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </>
  );
}
