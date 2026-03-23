import { geminiAI } from "@/app/lib/ai/google/service";
import { useQuery } from "@tanstack/react-query";

export const useGeminiAI = () => {
  return useQuery({
    queryKey: ["gemini-ai"],
    queryFn: async () => {
      return geminiAI;
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
      return geminiAI.generateMovieWatchAnalysis({ mood, genres, title });
    },
  });
};

export const useMovieAnalysis = (title: string) => {
  return useQuery({
    queryKey: ["movie-analysis", title],
    queryFn: async () => {
      return geminiAI.generateMovieAnalysis(title);
    },
  });
};
