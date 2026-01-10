import type { Metadata } from "next";

import { appConfig } from "@/config/app";
import { env } from "@/config/env";

export const seoConfig: Metadata = {
  title: {
    template: `%s | ${appConfig.name}`,
    default: appConfig.name,
  },
  description:
    "Starter template built using nextjs and other high techs: tailwindcss, shadcn/ui.",
  keywords: [
    "nextjs",
    "shadcn",
    "tailwindcss",
    "frontend",
    "web",
    "lint staging",
    "commitlint",
  ],
  authors: [
    {
      name: "Santosh Tharu",
      url: "https://github.com/er-santosh",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.NEXT_PUBLIC_API_URL,
    siteName: appConfig.name,
    title: appConfig.name,
    description:
      "Starter template built using nextjs and other high techs: tailwindcss, shadcn/ui.",
    images: [
      {
        url: "/og-image.png", // 1200x630px recommended
        width: 1200,
        height: 630,
        alt: appConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.name,
    description:
      "Starter template built using nextjs and other high techs: tailwindcss, shadcn/ui.",
    images: ["/twitter.png"], // 1200x630px recommended
    creator: "@ErSantoshTharu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
