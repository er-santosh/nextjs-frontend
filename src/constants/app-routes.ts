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
  },
  VERIFICATION: {
    VERIFY_EMAIL: "/verify-email",
  },
  PROTECTED: {
    ACCOUNT: {
      ROOT: "/account",
      SECURITY: "/account/security",
    },
  },
};

// Routes that don't require authentication
export const PUBLIC_ROUTES = extractRoutes(APP_ROUTES.SITE);

// Authentication routes (lOGIN, rEGISTER)
export const AUTH_ROUTES = [
  APP_ROUTES.AUTH.LOGIN,
  APP_ROUTES.AUTH.REGISTER,
  APP_ROUTES.AUTH.FORGOT_PASSWORD,
  APP_ROUTES.AUTH.RESET_PASSWORD,
];

// email verification routes
export const EMAIL_VERIFICATION_ROUTES = [APP_ROUTES.VERIFICATION.VERIFY_EMAIL];
