import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { AUTH_KEYS } from "@/constants/query-keys";

import type { User } from "@/types/api/shared";

export const STALE_TIME = 1000 * 60 * 5;
export const GC_TIME = 1000 * 60 * 10;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error instanceof AxiosError && error.response?.status === 401) {
          return false;
        }
        return failureCount < 2;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

export const setCurrentUserData = (user?: User) => {
  queryClient.setQueryData(AUTH_KEYS.currentUser(), {
    data: {
      user,
    },
  });
};
