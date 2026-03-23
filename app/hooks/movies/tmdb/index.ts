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
    //   staleTime: 1000 * 60 * 15, // 15 minutes (top rated changes less frequently)
    //   gcTime: 1000 * 60 * 60, // 1 hour
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
//   slug: string,
//   enabled: boolean = true
// ) => {
//   return useQuery({
//     queryKey: ["movie-details-by-slug", slug],
//     queryFn: async () => {
//       try {
//         const movieId = extractIdFromSlug(slug);
//         const { getMovieDetails, addMovieDetails } = useCacheStore.getState();

//         const cached = getMovieDetails(movieId);
//         if (cached) {
//           return cached;
//         }

//         const data = await tmdbClient.getMovieDetails(movieId, [
//           "credits",
//           "videos",
//           "similar",
//           "recommendations",
//           "reviews",
//         ]);
//         addMovieDetails(movieId, data);
//         return data;
//       } catch {
//         throw new Error(`Invalid movie slug: ${slug}`);
//       }
//     },
//     enabled: enabled && !!slug,
//     staleTime: 1000 * 60 * 15, // 15 minutes
//     gcTime: 1000 * 60 * 60, // 1 hour
//   });
// };
