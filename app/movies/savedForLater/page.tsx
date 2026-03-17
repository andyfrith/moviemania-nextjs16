import Link from "next/link";
import { getSavedForLater } from "@/app/lib/actions";
import { Movie } from "@/app/lib/types";
import SearchForMoviesButton from "@/app/components/SearchForMoviesButton";

export default async function Page() {
  const savedForLater = await getSavedForLater();

  if (!savedForLater) {
    return (
      <div className="bg-gray-900 min-h-screen text-white font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="mb-8 md:mb-12">
            <div className="flex items-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white border-l-4 border-yellow-400 pl-4">
                Movies
              </h1>
              <div className="ml-auto">
                <SearchForMoviesButton />
              </div>
            </div>
            <p className="text-gray-400 mt-2 pl-5">Nothing saved for later.</p>
          </div>
        </div>
      </div>
    );
  }

  const movies = savedForLater.map((movie) =>
    JSON.parse(movie),
  ) as Array<Movie>;
  const totalResults = movies.length;

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <div className="flex items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white border-l-4 border-yellow-400 pl-4">
              Saved For Later
            </h1>
            <div className="ml-auto">
              <SearchForMoviesButton />
            </div>
          </div>
          {movies.length && (
            <p className="text-gray-400 mt-2 pl-5">
              Found {movies.length} results
            </p>
          )}
        </div>
        {movies && totalResults > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 mt-10">
              {movies.map((movie) => (
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
