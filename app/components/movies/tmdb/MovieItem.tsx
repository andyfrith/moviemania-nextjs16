"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/app/lib/tmdb/types";
import tmdbClient from "@/app/lib/tmdb/client";

export default function MovieItem({ movie }: { movie: Movie }) {
  return (
    <Link
      key={movie.id}
      href={`/movies/tmdb/${movie.id}`}
      className="group relative block bg-black rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <Image
        width={275}
        height={435}
        src={
          tmdbClient.getImageUrl(movie.poster_path, "w500") ||
          "/placeholder-poster.svg"
        }
        alt={`Poster of ${movie.title}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-90"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-center">
          <h3 className="text-white font-bold text-md leading-tight">
            {movie.title}
          </h3>
          <p className="text-gray-300 text-sm mt-1">{movie.release_date}</p>
        </div>
      </div>
    </Link>
  );
}
