"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useApiMutation } from "@/hooks/api/use-api-mutation";

import { authService } from "@/services/auth";

import {
  ForgotPasswordInputSchema,
  type ForgotPasswordInput,
} from "@/schemas/auth";

import type { SendResetPasswordEmailResponse } from "@/types/api/auth";

export function useForgotPasswordForm() {
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordInputSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync, isPending } = useApiMutation<
    SendResetPasswordEmailResponse,
    ForgotPasswordInput
  >({
    mutationFn: payload => authService.sendResetPasswordEmail(payload.email),
    onSuccess() {
      form.reset();
    },
  });

  const handleSubmit = async (data: ForgotPasswordInput) => {
    await mutateAsync(data);
  };

  return {
    form,
    isSubmitting: isPending,
    handleSubmit,
  };
}
