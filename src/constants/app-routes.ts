import { extractRoutes } from "@/lib/utils/routes";

export const APP_ROUTES = {
  SITE: {
    ROOT: "/",
    PRICING: "/pricing",
    CONTACT: "/contact",
  },
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    VERIFY_EMAIL: "/verify-email",
  },
  PROTECTED: {
    DASHBOARD: "/dashboard",
    SETTINGS: {
      ACCOUNT: {
        ROOT: "/settings/account",
        SECURITY: "/settings/account/security",
      },
    },
  },
};

export const PUBLIC_ROUTES = extractRoutes(APP_ROUTES.SITE);

export const AUTH_ROUTES = [
  APP_ROUTES.AUTH.LOGIN,
  APP_ROUTES.AUTH.REGISTER,
  APP_ROUTES.AUTH.FORGOT_PASSWORD,
  APP_ROUTES.AUTH.RESET_PASSWORD,
  APP_ROUTES.AUTH.VERIFY_EMAIL,
];
