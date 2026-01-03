import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import type { ApiResponse } from "@/types/api/shared";

type ApiMutationOptions<TData, TVariables, TContext = unknown> = Omit<
  UseMutationOptions<TData, AxiosError<ApiResponse>, TVariables, TContext>,
  "mutationFn"
> & {
  mutationFn: (variables: TVariables) => Promise<TData>;
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
};

/**
 * Generic mutation hook with built-in error handling for API responses
 *
 * @template TData - The data type returned by the mutation (what your service method returns)
 * @template TVariables - The variables type passed to the mutation
 * @template TContext - Optional context type from onMutate
 *
 * @example
 * const { mutateAsync } = useApiMutation<LoginResponse, LoginInput>({
 *   mutationFn: (credentials) => authService.login(credentials),
 *   showErrorToast: true,
 * });
 */
export function useApiMutation<
  TData = unknown,
  TVariables = void,
  TContext = unknown,
>(
  options: ApiMutationOptions<TData, TVariables, TContext>
): UseMutationResult<TData, AxiosError<ApiResponse>, TVariables, TContext> {
  const {
    showErrorToast = true,
    showSuccessToast = false,
    successMessage,
    onError,
    onSuccess,
    ...mutationOptions
  } = options;

  return useMutation<TData, AxiosError<ApiResponse>, TVariables, TContext>({
    ...mutationOptions,
    onError: (...args) => {
      const [error] = args;
      if (showErrorToast) {
        const errorMessage =
          error.response?.data.message ?? "An unexpected error occurred";
        toast.error(errorMessage);
      }
      onError?.(...args);
    },
    onSuccess: (...args) => {
      if (showSuccessToast && successMessage) {
        toast.success(successMessage);
      }
      onSuccess?.(...args);
    },
  });
}
