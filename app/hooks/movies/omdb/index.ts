import { useQuery } from "@tanstack/react-query";
import omdbClient from "@/app/lib/omdb/client";

export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: async () => {
      const data = await omdbClient.getMovie(id.toString());
      return data;
    },
  });
};
