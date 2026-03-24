import tmdbClient from "@/app/lib/tmdb/client";
import MoviesHeader from "@/app/components/movies/tmdb/Header";
import MovieItems from "@/app/components/movies/tmdb/MovieItems";
import Pagination from "@/app/components/movies/tmdb/Pagination";
import Search from "@/app/components/movies/tmdb/Search";

const RESULTS_PER_PAGE = 20;

export default async function Page(props: {
  searchParams?: Promise<{
    s: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.s || "";
  const currentPage = Number(searchParams?.page) || 1;

  if (!searchParams || query === "") {
    return (
      <>
        <MoviesHeader subtitle="Let's go to the movies! Enter your movie title below." />
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search movies..." />
        </div>
      </>
    );
  }

  const response = await tmdbClient.searchMovies(query, currentPage);
  const movies = response.results;
  const totalResults = Number(response.total_results);

  if (totalResults === 0) {
    return (
      <>
        <MoviesHeader
          subtitle={`No movies found. Please try another search.`}
        />
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search movies..." />
        </div>
      </>
    );
  }
  return (
    <>
      <MoviesHeader />
      {totalResults && (
        <p className="text-gray-400 mt-2 pl-5">
          Found <span className="font-bold">{totalResults}</span> results
        </p>
      )}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search movies..." />
      </div>
      {movies && movies.length > 0 ? (
        <>
          <MovieItems movies={movies} />
          {totalResults && totalResults > RESULTS_PER_PAGE && (
            <Pagination
              totalPages={Math.ceil(Number(totalResults) / RESULTS_PER_PAGE)}
            />
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-400 text-lg">No movies found.</p>
        </div>
      )}
    </>
  );
}
