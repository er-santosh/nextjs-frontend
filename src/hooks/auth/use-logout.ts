"use client";

import { useRouter } from "next/navigation";

import { useApiMutation } from "@/hooks/api/use-api-mutation";

import { authService } from "@/services/auth";

import { APP_ROUTES } from "@/constants/app-routes";
import { AUTH_KEYS } from "@/constants/query-keys";

import { queryClient } from "@/lib/query-client";

interface UseLogoutOptions {
  onLogoutStart?: () => void;
  onLogoutSuccess?: () => void;
  onLogoutError?: (error: unknown) => void;
}

export function useLogout({
  onLogoutStart,
  onLogoutError,
  onLogoutSuccess,
}: UseLogoutOptions = {}) {
  const router = useRouter();

  const { mutateAsync, isPending } = useApiMutation<void, void>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: AUTH_KEYS.all });
      router.push(APP_ROUTES.AUTH.LOGIN);
    },
    onError(error) {
      onLogoutError?.(error);
    },
  });

  const handleLogout = async () => {
    onLogoutStart?.();

    await mutateAsync();

    onLogoutSuccess?.();
  };

  return {
    handleLogout,
    isPending,
  };
}
