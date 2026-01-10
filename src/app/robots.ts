import { type MetadataRoute } from "next";

import { env } from "@/config/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/dashboard"], // Add paths you want to block
    },
    sitemap: `${env.NEXT_PUBLIC_API_URL}/sitemap.xml`,
  };
}
