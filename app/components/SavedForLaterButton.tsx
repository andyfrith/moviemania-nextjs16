"use client";

import { TvMinimalPlay } from "lucide-react";
import Link from "next/link";

export default function SavedForLaterButton() {
  return (
    <Link href={"/movies/savedForLater"}>
      <button
        type="button"
        className="inline-flex items-center gap-2 mt-10 mb-5 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 font-semibold transition-all duration-200 ease-in-out group hover:bg-yellow-400 hover:text-gray-900"
      >
        <TvMinimalPlay className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
        <span>Saved For Later</span>
      </button>
    </Link>
  );
}
