"use client";

import { useUserStore } from "@/app/stores/userStore";
import { Movie } from "@/app/lib/types";
import { Markdown } from "@/app/components/Markdown";
import { useMovieWatchAnalysis } from "@/app/hooks/ai/useOllamaAI";

export default function MovieWatchAnalysis({ movie }: { movie: Movie }) {
  const { user } = useUserStore();
  const {
    data: movieWatchAnalysis,
    isLoading,
    error,
  } = useMovieWatchAnalysis(
    user?.preferences.mood || [],
    user?.preferences.genres || [],
    movie.Title,
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // if (!movieWatchAnalysis) return <div>No movie watch analysis found</div>;

  if (!movieWatchAnalysis) return <div>No movie watch analysis found</div>;

  return (
    <>
      <h3 className="text-xl font-semibold">Recommendation</h3>
      <div className="bg-gray-800 w-full my-4 rounded-2xl text-gray-300 leading-relaxed p-4">
        <Markdown>{movieWatchAnalysis.analysis.recommendation}</Markdown>
      </div>
      <h3 className="text-xl font-semibold">Reasoning</h3>
      <div className="bg-gray-800 w-full my-4 rounded-2xl text-gray-300 leading-relaxed p-4">
        <Markdown>{movieWatchAnalysis.analysis.reasoning.join("\n")}</Markdown>
      </div>
      {/* <h3 className="text-xl font-semibold mb-3">Confidence</h3>
      <div className="bg-gray-800 w-full my-8 rounded-2xl text-gray-300 leading-relaxed p-4">
        <Markdown>{movieWatchAnalysis.analysis.confidence.toString()}</Markdown>
      </div>
      <h3 className="text-xl font-semibold mb-3">Future Mood</h3>
      <div className="bg-gray-800 w-full my-8 rounded-2xl text-gray-300 leading-relaxed p-4">
        <Markdown>{movieWatchAnalysis.analysis.futureMood}</Markdown>
      </div>
      <h3 className="text-xl font-semibold mb-3">Future Activity</h3>
      <div className="bg-gray-800 w-full my-8 rounded-2xl text-gray-300 leading-relaxed p-4">
        <Markdown>{movieWatchAnalysis.analysis.futureActivity}</Markdown>
      </div>
      <h3 className="text-xl font-semibold mb-3">Movie Genres</h3>
      <div className="bg-gray-800 w-full my-8 rounded-2xl text-gray-300 leading-relaxed p-4">
        <Markdown>
          {movieWatchAnalysis.analysis.movieGenres.join(", ")}
        </Markdown>
      </div>
      <h3 className="text-xl font-semibold mb-3">Movie Themes</h3> */}
    </>
  );
}
