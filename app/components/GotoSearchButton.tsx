"use client";

import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default function GotoSearchButton() {
  return (
    <Link href={"/movies"}>
      <button
        type="button"
        className="inline-flex items-center gap-2 mt-10 mb-5 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 font-semibold transition-all duration-200 ease-in-out group hover:bg-yellow-400 hover:text-gray-900"
      >
        <ArrowBigLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1" />
        <span>Search Movies</span>
      </button>
    </Link>
  );
}
