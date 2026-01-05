"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useApiMutation } from "@/hooks/api/use-api-mutation";

import { authService } from "@/services/auth";

import {
  ChangePasswordSchema,
  type ChangePasswordInput,
} from "@/schemas/profile";

import type { ChangePasswordResponse } from "@/types/api/auth";

const useChangePasswordForm = () => {
  const form = useForm<ChangePasswordInput>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ChangePasswordSchema),
  });

  const { mutateAsync } = useApiMutation<
    ChangePasswordResponse,
    ChangePasswordInput
  >({
    mutationFn: payload => authService.changePassword(payload),
    onSuccess() {
      form.reset();
    },
  });

  const onSubmit = async (data: ChangePasswordInput) => {
    await mutateAsync(data);
  };

  return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
};

export default useChangePasswordForm;
