import { notFound } from "next/navigation";
import client from "@/app/lib/omdb/client";
import { orbitron } from "@/app/lib/fonts";
import Image from "next/image";

export default async function Page(props: {
  params: Promise<{ imdbID: string }>;
}) {
  const params = await props.params;
  const imdbID = params.imdbID;
  const movie = await client.getMovie(imdbID);

  if (!movie) {
    notFound();
  }

  return (
    <div className={"bg-gray-900 min-h-screen text-white"}>
      <div
        className={`${orbitron.className} antialiased relative h-96 w-full bg-cover bg-center`}
        style={{ backgroundImage: `url(${movie.Poster})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-wider">
            {movie.Title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mt-2">{movie.Genre}</p>
        </div>
      </div>

      <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-2">
          <h2
            className={`${orbitron.className} antialiased text-2xl font-bold mb-4 border-l-4 border-yellow-400 pl-4`}
          >
            Plot Summary
          </h2>
          <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Director:</strong> {movie.Director}
              </div>
              <div>
                <strong>Writer:</strong> {movie.Writer}
              </div>
              <div>
                <strong>Actors:</strong> {movie.Actors}
              </div>
              <div>
                <strong>Released:</strong> {movie.Released}
              </div>
              <div>
                <strong>Runtime:</strong> {movie.Runtime}
              </div>
              <div>
                <strong>Rated:</strong> {movie.Rated}
              </div>
              <div>
                <strong>Country:</strong> {movie.Country}
              </div>
              <div>
                <strong>Language:</strong> {movie.Language}
              </div>
              <div>
                <strong>Box Office:</strong> {movie.BoxOffice}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Awards</h3>
            <p className="text-gray-400">{movie.Awards}</p>
          </div>
        </div>
        <div className="space-y-6">
          <Image
            width={500}
            height={750}
            src={movie.Poster}
            alt={`Poster of ${movie.Title}`}
            className="rounded-lg shadow-xl w-full"
          />
          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
