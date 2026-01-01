import type { PropsWithChildren } from "react";

import { QueryClientProvider } from "@/providers/query-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { VercelProvider } from "@/providers/vercel-provider";

import { Toaster } from "@/components/ui/sonner";

const AppProvider = ({ children }: PropsWithChildren) => (
  <VercelProvider>
    <QueryClientProvider>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </VercelProvider>
);

export default AppProvider;
