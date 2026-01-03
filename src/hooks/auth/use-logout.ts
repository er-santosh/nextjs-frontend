"use client";

import { useRouter } from "next/navigation";

import { authService } from "@/services/auth";

import { useApiMutation } from "@/hooks/api/use-api-mutation";

import { queryClient } from "@/lib/query-client";

import { APP_ROUTES } from "@/constants/app-routes";
import { AUTH_KEYS } from "@/constants/query-keys";

export function useLogout() {
  const router = useRouter();

  const { mutateAsync, isPending } = useApiMutation<void, void>({
    mutationFn: () => authService.logout(),
    showErrorToast: true,
    showSuccessToast: true,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: AUTH_KEYS.all });
      router.push(APP_ROUTES.AUTH.LOGIN);
    },
  });

  const handleLogout = async () => {
    await mutateAsync();
  };

  return {
    handleLogout,
    isPending,
  };
}
