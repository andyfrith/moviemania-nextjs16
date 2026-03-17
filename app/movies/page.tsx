import Pagination from "@/app/components/Pagination";
import Search from "@/app/components/Search";
import Link from "next/link";
import { fetchMovies } from "@/app/lib/data";
import { RESULTS_PER_PAGE } from "@/app/lib/constants";
import { Movie } from "@/app/lib/types";
import SavedForLaterButton from "../components/SavedForLaterButton";

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
      <div className="bg-gray-900 min-h-screen text-white font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="mb-8 md:mb-12">
            <div className="flex items-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white border-l-4 border-yellow-400 pl-4">
                Movies
              </h1>
              <div className="ml-auto">
                <SavedForLaterButton />
              </div>
            </div>
            <p className="text-gray-400 mt-2 pl-5">
              Let's go to the movies! Enter your movie title below.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search movies..." />
          </div>
        </div>
      </div>
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
      <div className="bg-gray-900 min-h-screen text-white font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="mb-8 md:mb-12">
            <div className="flex items-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white border-l-4 border-yellow-400 pl-4">
                Movies
              </h1>
              <div className="ml-auto">
                <SavedForLaterButton />
              </div>
            </div>
            <p className="text-gray-400 mt-2 pl-5">
              An error has been returned by the OMDb API:{" "}
              {moviesSearchResponse.Error}. Please try another search.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search movies..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <div className="flex items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white border-l-4 border-yellow-400 pl-4">
              Movies
            </h1>
            <div className="ml-auto">
              <SavedForLaterButton />
            </div>
          </div>
          {totalResults && (
            <p className="text-gray-400 mt-2 pl-5">
              Found {totalResults} results
            </p>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search movies..." />
        </div>

        {movies && movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 mt-10">
              {fitlerOutDuplicates(movies).map((movie) => (
                <Link
                  key={movie.imdbID}
                  href={`/movies/${movie.imdbID}`}
                  className="group relative block bg-black rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x444.png?text=No+Image"
                    }
                    alt={`Poster of ${movie.Title}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-center">
                      <h3 className="text-white font-bold text-md leading-tight">
                        {movie.Title}
                      </h3>
                      <p className="text-gray-300 text-sm mt-1">{movie.Year}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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
      </div>
    </div>
  );
}
