"use client";

import { type PropsWithChildren } from "react";

import { QueryClientProvider as TanstackQueryProvider } from "@tanstack/react-query";

import { queryClient } from "@/lib/query-client";

export const QueryClientProvider = (props: PropsWithChildren) => {
  return (
    <TanstackQueryProvider client={queryClient}>
      {props.children}
    </TanstackQueryProvider>
  );
};
