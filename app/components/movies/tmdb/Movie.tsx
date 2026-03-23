"use client";

// import { MovieDetails } from "@/app/lib/tmdb/types";
import Image from "next/image";
import { orbitron } from "@/app/lib/fonts";
import { useMovieDetails } from "@/app/hooks/movies/tmdb";
import tmdbClient from "@/app/lib/tmdb/client";

export default function Movie({ id }: { id: number }) {
  const { data: movie, isLoading, error } = useMovieDetails(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!movie) return <div>No movie</div>;
  return (
    <div className={"bg-gray-900 min-h-screen text-white"}>
      <div
        className={`${orbitron.className} antialiased relative h-96 w-full bg-cover bg-center`}
        style={{
          backgroundImage: `url(${tmdbClient.getImageUrl(movie.poster_path, "w500") || "/placeholder-poster.svg"})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-wider">
            {movie.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mt-2">
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>

      <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-2">
          <h2
            className={`${orbitron.className} antialiased text-2xl font-bold mb-4 border-l-4 border-yellow-400 pl-4`}
          >
            Plot Summary
          </h2>
          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Director:</strong>{" "}
                {
                  movie.credits?.crew.find((crew) => crew.job === "Director")
                    ?.name
                }
              </div>
              <div>
                <strong>Writer:</strong>{" "}
                {
                  movie.credits?.crew.find((crew) => crew.job === "Writer")
                    ?.name
                }
              </div>
              <div>
                <strong>Actors:</strong>{" "}
                {movie.credits?.cast.map((cast) => cast.name).join(", ")}
              </div>
              <div>
                <strong>Released:</strong> {movie.release_date}
              </div>
              <div>
                <strong>Runtime:</strong> {movie.runtime}
              </div>
              <div>
                <strong>Rated:</strong> {movie.vote_average.toFixed(1)}
              </div>
              <div>
                <strong>Country:</strong>{" "}
                {movie.production_countries
                  .map((country) => country.name)
                  .join(", ")}
              </div>
              <div>
                <strong>Language:</strong>{" "}
                {movie.spoken_languages
                  .map((language) => language.name)
                  .join(", ")}
              </div>
              <div>
                <strong>Box Office:</strong> {movie.revenue}
              </div>
            </div>
          </div>
          <div className="mt-8">{JSON.stringify(movie.credits)}</div>
          {/* <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Awards</h3>
            <p className="text-gray-400">{movie.Awards}</p>
          </div> */}
        </div>
        <div className="space-y-6">
          <Image
            width={500}
            height={750}
            src={
              tmdbClient.getImageUrl(movie.poster_path, "w500") ||
              "/placeholder-poster.svg"
            }
            alt={`Poster of ${movie.title}`}
            className="rounded-lg shadow-xl w-full"
          />
          {/* <div>
            <h3 className="text-xl font-semibold mb-3">Ratings</h3>
            <div className="space-y-3">
              {movie.Ratings?.map((rating, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-3 rounded-lg flex justify-between items-center"
                >
                  <span className="text-gray-400 text-sm">{rating.Source}</span>
                  <span className="font-bold text-lg text-yellow-400">
                    {rating.Value}
                  </span>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
