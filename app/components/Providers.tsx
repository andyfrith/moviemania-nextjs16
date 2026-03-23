"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 1000 * 60 * 5, // 5 minutes
//       gcTime: 1000 * 60 * 30, // 30 minutes (was cacheTime)
//       retry: (failureCount, error) => {
//         // Don't retry on 404s
//         const status = (error as { response?: { status?: number } })?.response
//           ?.status;
//         if (status === 404) {
//           return false;
//         }
//         // Retry up to 3 times for other errors
//         return failureCount < 3;
//       },
//       refetchOnWindowFocus: false,
//       refetchOnReconnect: true,
//     },
//     mutations: {
//       retry: 1,
//     },
//   },
// });

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
