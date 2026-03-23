"use client";

import { useTopRatedMovies } from "@/app/hooks/movies/tmdb";
import MovieItems from "@/app/components/movies/tmdb/MovieItems";
import { RESULTS_PER_PAGE } from "@/app/lib/constants";
import Pagination from "@/app/components/movies/tmdb/Pagination";

export default function TopRated() {
  const { data, isLoading, error } = useTopRatedMovies();
  const totalResults = Number(data?.total_results ?? 0);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <>
      {totalResults && (
        <p className="text-gray-400 mt-2 pl-5">
          Found <span className="font-bold">{totalResults}</span> results
        </p>
      )}
      <MovieItems movies={data?.results ?? []} />
      {totalResults && totalResults > RESULTS_PER_PAGE && (
        <Pagination
          totalPages={Math.ceil(Number(totalResults) / RESULTS_PER_PAGE)}
        />
      )}
    </>
  );
}
