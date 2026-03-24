import { useQuery } from "@tanstack/react-query";
import tmdbClient from "@/app/lib/tmdb/client";

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const data = await tmdbClient.getMovieGenres();
      return data;
    },
  });
};

export const useTopRatedMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ["top-rated-movies", page],
    queryFn: async () => {
      const data = await tmdbClient.getTopRatedMovies(page);
      return data;
    },
  });
};

export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: async () => {
      const data = await tmdbClient.getMovieDetails(id);
      return data;
    },
  });
};
