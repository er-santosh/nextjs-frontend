import { extractRoutes } from "@/lib/utils/classname/routes";

export const APP_ROUTES = {
  SITE: {
    ROOT: "/",
    PRICING: "/pricing",
    CONTACT: "/contact",
  },
};

export const PUBLIC_ROUTES = extractRoutes(APP_ROUTES.SITE);
