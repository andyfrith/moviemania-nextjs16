import {
  generateOllamaMovieAnalysis,
  generateOllamaMovieWatchAnalysis,
} from "@/app/lib/actions";
import { useQuery } from "@tanstack/react-query";

export const useMovieAnalysis = (title: string) => {
  return useQuery({
    queryKey: ["movie-analysis", title],
    queryFn: async () => {
      return generateOllamaMovieAnalysis(title);
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
      return generateOllamaMovieWatchAnalysis(mood, genres, title);
    },
  });
};
