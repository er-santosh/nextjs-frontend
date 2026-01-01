import type { Metadata } from "next";

import { appConfig } from "@/config/app";

export const seoConfig: Metadata = {
  title: {
    template: `%s | ${appConfig.name}`,
    default: appConfig.name,
  },
  description:
    "Starter template built using nextjs and other high techs: tailwindcss, shadcn/ui.",
};
