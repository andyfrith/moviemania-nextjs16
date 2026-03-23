import { getSavedForLater } from "@/app/lib/actions";
import { Movie } from "@/app/lib/types";
import SearchForMoviesButton from "@/app/components/SearchForMoviesButton";
import MoviesHeader from "@/app/components/movies/Header";
import MovieItems from "@/app/components/MovieItems";

export default async function Page() {
  const movies = await getSavedForLater();

  if (!movies) {
    return null;
  }

  const totalResults = movies.length;

  return (
    <>
      {movies.length && (
        <p className="text-gray-400 mt-2 pl-5">Found {movies.length} results</p>
      )}
      {movies && totalResults > 0 ? (
        <MovieItems movies={movies} />
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-400 text-lg">No movies found.</p>
        </div>
      )}
    </>
  );
}
