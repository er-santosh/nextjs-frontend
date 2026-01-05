import type { PropsWithChildren } from "react";

import NextTopLoader from "nextjs-toploader";

import { QueryClientProvider } from "@/providers/query-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { VercelProvider } from "@/providers/vercel-provider";

import { Toaster } from "@/components/ui/sonner";

const AppProvider = ({ children }: PropsWithChildren) => (
  <VercelProvider>
    <QueryClientProvider>
      <ThemeProvider>
        <NextTopLoader color="var(--color-primary)" showSpinner={false} />
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </VercelProvider>
);

export default AppProvider;
