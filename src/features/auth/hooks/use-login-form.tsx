"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useApiMutation } from "@/hooks/api/use-api-mutation";

import { authService } from "@/services/auth";

import { LoginInputSchema, type LoginInput } from "@/schemas/auth";

import { APP_ROUTES } from "@/constants/app-routes";
import { AUTH_KEYS } from "@/constants/query-keys";

import { queryClient } from "@/lib/query-client";

import type { LoginResponse } from "@/types/api/auth";

interface UseLoginFormProps {
  callbackUrl: string | null;
}

export function useLoginForm(
  { callbackUrl }: UseLoginFormProps = { callbackUrl: null }
) {
  const router = useRouter();

  const { mutateAsync, isPending } = useApiMutation<LoginResponse, LoginInput>({
    mutationFn: credentials => authService.login(credentials),
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: AUTH_KEYS.currentUser(),
      });

      router.push(APP_ROUTES.SITE.ROOT);

      const safeCallbackUrl = getSafeCallbackUrl(callbackUrl);

      if (safeCallbackUrl) {
        router.push(safeCallbackUrl);
      } else {
        router.push(APP_ROUTES.SITE.ROOT);
      }
    },
  });

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginInputSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginInput) => {
    await mutateAsync(data);
  };

  function getSafeCallbackUrl(cbUrl: string | null): string | null {
    if (!cbUrl) return null;

    if (cbUrl.startsWith("/") && !cbUrl.startsWith("//")) {
      return cbUrl;
    }

    try {
      const url = new URL(cbUrl);
      const currentOrigin = window.location.origin;

      if (url.origin === currentOrigin) {
        return url.pathname + url.search + url.hash;
      }
    } catch {
      return null;
    }

    return null;
  }

  return {
    form,
    isSubmitting: isPending,
    handleSubmit,
    callbackUrl,
  };
}
