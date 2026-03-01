import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import type { ApiResponse } from "@/types/api/shared";

import { useApiMutation } from "./use-api-mutation";

jest.mock("sonner");

const mockToast = toast as jest.Mocked<typeof toast>;

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
    },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe("useApiMutation", () => {
  it("calls mutationFn on mutate", async () => {
    const mutationFn = jest.fn().mockResolvedValue({ message: "done" });
    const { result } = renderHook(
      () => useApiMutation({ mutationFn, showSuccessToast: false }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.mutate(undefined);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mutationFn).toHaveBeenCalledTimes(1);
  });

  it("shows error toast from error.response.data.message when showErrorToast is true", async () => {
    const axiosError = {
      response: { data: { message: "Bad credentials" } },
    } as AxiosError<ApiResponse>;
    const mutationFn = jest.fn().mockRejectedValue(axiosError);

    const { result } = renderHook(
      () =>
        useApiMutation({
          mutationFn,
          showErrorToast: true,
          showSuccessToast: false,
        }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.mutate(undefined);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(mockToast.error).toHaveBeenCalledWith("Bad credentials");
  });

  it("shows success toast from response.message when showSuccessToast is true", async () => {
    const response: ApiResponse = {
      success: true,
      message: "Operation successful",
      code: "BAD_REQUEST",
    };
    const mutationFn = jest.fn().mockResolvedValue(response);

    const { result } = renderHook(
      () =>
        useApiMutation({
          mutationFn,
          showSuccessToast: true,
          showErrorToast: false,
        }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.mutate(undefined);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockToast.success).toHaveBeenCalledWith("Operation successful");
  });

  it("calls onError callback after showing toast", async () => {
    const axiosError = {
      response: { data: { message: "Error" } },
    } as AxiosError<ApiResponse>;
    const mutationFn = jest.fn().mockRejectedValue(axiosError);
    const onError = jest.fn();

    const { result } = renderHook(
      () =>
        useApiMutation({
          mutationFn,
          showErrorToast: true,
          showSuccessToast: false,
          onError,
        }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.mutate(undefined);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(onError).toHaveBeenCalled();
  });

  it("calls onSuccess callback after showing toast", async () => {
    const response: ApiResponse = {
      success: true,
      message: "Done",
      code: "BAD_REQUEST",
    };
    const mutationFn = jest.fn().mockResolvedValue(response);
    const onSuccess = jest.fn();

    const { result } = renderHook(
      () =>
        useApiMutation({
          mutationFn,
          showSuccessToast: true,
          showErrorToast: false,
          onSuccess,
        }),
      { wrapper: createWrapper() }
    );

    act(() => {
      result.current.mutate(undefined);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(onSuccess).toHaveBeenCalled();
  });
});
