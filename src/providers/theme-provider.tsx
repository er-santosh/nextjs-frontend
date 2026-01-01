"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export const ThemeProvider = (props: ThemeProviderProps) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    storageKey="theme"
    disableTransitionOnChange
    {...props}
  />
);
