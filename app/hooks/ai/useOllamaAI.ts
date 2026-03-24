import { ollamaAI } from "@/app/lib/ai/ollama/service";
import { useQuery } from "@tanstack/react-query";

export const useMovieAnalysis = (title: string) => {
  return useQuery({
    queryKey: ["movie-analysis", title],
    queryFn: async () => {
      return ollamaAI.generateMovieAnalysis(title);
    },
  });
};

export const useMovieWatchAnalysis = (
  mood: string[],
  genres: string[],
  title: string,
) => {
  return useQuery({
    queryKey: ["movie-watch-analysis", mood, genres, title],
    queryFn: async () => {
      return ollamaAI.generateMovieWatchAnalysis({ mood, genres, title });
    },
  });
};
