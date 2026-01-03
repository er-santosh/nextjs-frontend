import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import type { ApiResponse } from "@/types/api/shared";

type ApiQueryOptions<TData, TPayload = void> = Omit<
  UseQueryOptions<TData, AxiosError<ApiResponse>>,
  "queryFn"
> & {
  queryFn: (payload: TPayload) => Promise<TData>;
  payload?: TPayload;
  showErrorToast?: boolean;
  onError?: (error: AxiosError<ApiResponse>) => void;
};

/**
 * Generic query hook with built-in error handling for API responses
 *
 * @template TData - The data type returned by the query (what your service method returns)
 * @template TPayload - Optional payload type for query parameters (pagination, filters, etc.)
 *
 * @example
 * // Without payload
 * const { data } = useApiQuery<User>({
 *   queryKey: AUTH_KEYS.currentUser(),
 *   queryFn: () => authService.getCurrentUser(),
 *   enabled: authService.hasValidSession(),
 * });
 *
 * @example
 * // With payload (pagination)
 * const { data } = useApiQuery<PaginatedUsers, PaginationParams>({
 *   queryKey: USER_KEYS.list(page, limit),
 *   queryFn: (params) => userService.getUsers(params),
 *   payload: { page: 1, limit: 10 },
 * });
 */
export function useApiQuery<TData = unknown, TPayload = void>(
  options: ApiQueryOptions<TData, TPayload>
): UseQueryResult<TData, AxiosError<ApiResponse>> {
  const {
    showErrorToast = false,
    onError,
    payload,
    queryFn,
    ...queryOptions
  } = options;

  return useQuery<TData, AxiosError<ApiResponse>>({
    ...queryOptions,
    queryFn: () => queryFn(payload as TPayload),
    throwOnError: error => {
      if (showErrorToast) {
        const errorMessage =
          error.response?.data.message ?? "Failed to fetch data";
        toast.error(errorMessage);
      }
      onError?.(error);
      return false;
    },
  });
}
