"use client";

import { Minus } from "lucide-react";
import { removeSaveForLater } from "@/app/lib/actions";
import { Movie } from "../lib/types";

export default function RemoveSaveForLaterButton({ movie }: { movie: Movie }) {
  function handleClick() {
    removeSaveForLater(movie);
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex ml-auto items-center gap-2 mt-10 mb-5 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 font-semibold transition-all duration-200 ease-in-out group hover:bg-yellow-400 hover:text-gray-900"
    >
      <Minus className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
      <span>Remove From Save For Later</span>
    </button>
  );
}
