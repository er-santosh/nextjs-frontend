"use client";

import { useApiQuery } from "@/hooks/api/use-api-query";

import { authService } from "@/services/auth";

import { AUTH_KEYS } from "@/constants/query-keys";

import type { GetCurrentUserResponse } from "@/types/api/auth";

export function useCurrentUser() {
  const hasSession = authService.hasValidSession();

  const { data, ...other } = useApiQuery<GetCurrentUserResponse>({
    queryKey: AUTH_KEYS.currentUser(),
    queryFn: () => authService.getCurrentUser(),
    enabled: hasSession,
    showErrorToast: false,
    retry: false,
    staleTime: Infinity,
  });

  return { user: data?.data?.user, ...other };
}
