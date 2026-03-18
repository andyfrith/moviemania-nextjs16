import Pagination from "@/app/components/Pagination";
import Search from "@/app/components/Search";
import { fetchMovies } from "@/app/lib/data";
import { RESULTS_PER_PAGE } from "@/app/lib/constants";
import { Movie } from "@/app/lib/types";
import SavedForLaterButton from "../components/SavedForLaterButton";
import MoviesHeader from "@/app/components/MoviesHeader";
import MovieItems from "../components/MovieItems";

export default async function Page(props: {
  searchParams?: Promise<{
    s: string;
    page?: string;
    y?: string;
    type?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.s || "";
  const year = searchParams?.y || "";
  const type = searchParams?.type || "";
  const currentPage = Number(searchParams?.page) || 1;

  if (!searchParams || query === "") {
    return (
      <>
        <MoviesHeader
          buttons={[<SavedForLaterButton />]}
          subtitle="Let's go to the movies! Enter your movie title below."
        />
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search movies..." />
        </div>
      </>
    );
  }

  const moviesSearchResponse = await fetchMovies(
    query,
    currentPage,
    year,
    type,
  );
  const movies = moviesSearchResponse.Search;
  const totalResults = Number(moviesSearchResponse.totalResults);

  function fitlerOutDuplicates(movies: Array<Movie>) {
    return Array.from(
      new Map(movies.map((item) => [item.imdbID, item])).values(),
    );
  }

  if (moviesSearchResponse.Error) {
    return (
      <>
        <MoviesHeader
          subtitle={`An error has been returned by the OMDb API:{" "}
            ${moviesSearchResponse.Error}. Please try another search.`}
        />
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search movies..." />
        </div>
      </>
    );
  }

  return (
    <>
      <MoviesHeader buttons={[<SavedForLaterButton />]} />
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
          <MovieItems movies={fitlerOutDuplicates(movies)} />
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
