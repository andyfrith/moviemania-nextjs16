"use client";

import { Movie } from "@/app/lib/types";
import { Markdown } from "@/app/components/Markdown";
import { useMovieAnalysis } from "@/app/hooks/ai/useOllamaAI";

export default function MovieAnalysis({ movie }: { movie: Movie }) {
  const {
    data: movieAnalysis,
    isLoading,
    error,
  } = useMovieAnalysis(movie.Title);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!movieAnalysis) return <div>No movie analysis found</div>;

  return (
    <div className="bg-gray-800 w-full my-8 rounded-2xl text-gray-300 leading-relaxed p-4">
      <Markdown>{movieAnalysis.analysis.summary}</Markdown>
    </div>
  );
}
