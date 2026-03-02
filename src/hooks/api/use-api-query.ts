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
