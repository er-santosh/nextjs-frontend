import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import type { ApiResponse } from "@/types/api/shared";

import { useApiQuery } from "./use-api-query";

jest.mock("sonner");

const mockToast = toast as jest.Mocked<typeof toast>;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("useApiQuery", () => {
  it("calls queryFn with payload", async () => {
    const queryFn = jest.fn().mockResolvedValue({ message: "data" });
    const payload = { page: 1 };

    const { result } = renderHook(
      () =>
        useApiQuery({
          queryKey: ["test"],
          queryFn,
          payload,
        }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(queryFn).toHaveBeenCalledWith(payload);
  });

  it("shows error toast from response when showErrorToast is true", async () => {
    const axiosError = {
      response: { data: { message: "Failed to load" } },
    } as AxiosError<ApiResponse>;
    const queryFn = jest.fn().mockRejectedValue(axiosError);

    const { result } = renderHook(
      () =>
        useApiQuery({
          queryKey: ["test-error"],
          queryFn,
          showErrorToast: true,
        }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(mockToast.error).toHaveBeenCalledWith("Failed to load");
  });

  it("calls onError callback on failure", async () => {
    const axiosError = {
      response: { data: { message: "Error" } },
    } as AxiosError<ApiResponse>;
    const queryFn = jest.fn().mockRejectedValue(axiosError);
    const onError = jest.fn();

    const { result } = renderHook(
      () =>
        useApiQuery({
          queryKey: ["test-on-error"],
          queryFn,
          showErrorToast: true,
          onError,
        }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(onError).toHaveBeenCalledWith(axiosError);
  });

  it("does not show toast when showErrorToast is false (default)", async () => {
    const axiosError = {
      response: { data: { message: "Error" } },
    } as AxiosError<ApiResponse>;
    const queryFn = jest.fn().mockRejectedValue(axiosError);

    const { result } = renderHook(
      () =>
        useApiQuery({
          queryKey: ["test-no-toast"],
          queryFn,
        }),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(mockToast.error).not.toHaveBeenCalled();
  });
});
