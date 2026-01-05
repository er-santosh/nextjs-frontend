"use client";

import { useApiQuery } from "@/hooks/api/use-api-query";

import { authService } from "@/services/auth";

import { AUTH_KEYS } from "@/constants/query-keys";

import type { GetCurrentUserResponse } from "@/types/api/auth";
import type { User } from "@/types/api/shared";

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

  const user = data?.data?.user;

  const isAuthenticated = Boolean(user);

  return {
    user: {
      ...user,
      name: `${user?.first_name} ${user?.last_name}`,
    } as User | undefined,
    isAuthenticated,
    ...other,
  };
}
