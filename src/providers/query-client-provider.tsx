"use client";

import { useMemo, type PropsWithChildren } from "react";

import {
  QueryClient,
  QueryClientProvider as TanstackQueryProvider,
} from "@tanstack/react-query";

export const QueryClientProvider = (props: PropsWithChildren) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry(failureCount) {
              return failureCount < 2;
            },
            refetchOnWindowFocus: false,
          },
        },
      }),
    []
  );

  return (
    <TanstackQueryProvider client={queryClient}>
      {props.children}
    </TanstackQueryProvider>
  );
};
