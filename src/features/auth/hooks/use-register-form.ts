"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useApiMutation } from "@/hooks/api/use-api-mutation";

import { authService } from "@/services/auth";

import { RegisterInputSchema, type RegisterInput } from "@/schemas/auth";

import { APP_ROUTES } from "@/constants/app-routes";

import type { RegisterResponse } from "@/types/api/auth";

export function useRegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterInputSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { mutateAsync, isPending } = useApiMutation<
    RegisterResponse,
    RegisterInput
  >({
    mutationFn: userData => authService.register(userData),
    onSuccess: () => {
      router.push(APP_ROUTES.AUTH.LOGIN);
    },
  });

  const handleSubmit = async (data: RegisterInput) => {
    await mutateAsync(data);
  };

  return {
    form,
    isSubmitting: isPending,
    handleSubmit,
  };
}
