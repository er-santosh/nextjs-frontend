"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useApiMutation } from "@/hooks/api/use-api-mutation";

import { authService } from "@/services/auth";

import {
  ResetPasswordInputSchema,
  type ResetPasswordInput,
} from "@/schemas/auth";

import { APP_ROUTES } from "@/constants/app-routes";

import type { ResetPasswordResponse } from "@/types/api/auth";

export function useResetPasswordForm(token: string | null) {
  const router = useRouter();

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordInputSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync, isPending } = useApiMutation<
    ResetPasswordResponse,
    Omit<ResetPasswordInput, "confirmPassword"> & { token: string }
  >({
    mutationFn: payload =>
      authService.resetPassword(payload.token, payload.newPassword),
    onSuccess() {
      router.push(APP_ROUTES.AUTH.LOGIN);
    },
  });

  const handleSubmit = async (data: ResetPasswordInput) => {
    if (!token) {
      toast.error("No token found!!!");

      return;
    }

    await mutateAsync({
      newPassword: data.newPassword,
      token,
    });
  };

  return {
    form,
    isSubmitting: isPending,
    handleSubmit,
  };
}
