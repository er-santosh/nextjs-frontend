import type { PropsWithChildren } from "react";

import type { Metadata } from "next";

import AppProvider from "@/providers/app-provider";

import { seoConfig } from "@/config/seo";

import { cn } from "@/lib/utils/classname";

import { FONT_POPPINS } from "@/constants/next-fonts";

import "./globals.css";

export const metadata: Metadata = seoConfig;

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(FONT_POPPINS.variable)}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
