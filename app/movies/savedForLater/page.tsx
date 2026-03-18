import { getSavedForLater } from "@/app/lib/actions";
import { Movie } from "@/app/lib/types";
import SearchForMoviesButton from "@/app/components/SearchForMoviesButton";
import MoviesHeader from "@/app/components/MoviesHeader";
import MovieItems from "@/app/components/MovieItems";

export default async function Page() {
  const savedForLater = await getSavedForLater();

  if (!savedForLater) {
    return (
      <MoviesHeader
        buttons={[<SearchForMoviesButton />]}
        subtitle="Nothing saved for later."
        title="Saved For Later"
      />
    );
  }

  const movies = savedForLater.map((movie) =>
    JSON.parse(movie),
  ) as Array<Movie>;
  const totalResults = movies.length;

  return (
    <>
      <MoviesHeader
        buttons={[<SearchForMoviesButton />]}
        subtitle={movies.length === 0 ? "Nothing saved for later." : ""}
        title="Saved For Later"
      />
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
