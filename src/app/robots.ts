import { type MetadataRoute } from "next";

import { env } from "@/config/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/dashboard"],
    },
    sitemap: `${env.NEXT_PUBLIC_API_URL}/sitemap.xml`,
  };
}
