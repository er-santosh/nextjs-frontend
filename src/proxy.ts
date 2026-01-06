import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest,
} from "next/server";

import { APP_ROUTES, AUTH_ROUTES, PUBLIC_ROUTES } from "@/constants/app-routes";

export default async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathName);
  const isAuthRoute = AUTH_ROUTES.includes(pathName);

  const accessToken = request.cookies.get("accessToken");
  const isAuthenticated = Boolean(accessToken);

  // Allow public routes for everyone
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Handle unauthenticated users
  if (!isAuthenticated) {
    // Allow access to auth routes
    if (isAuthRoute) {
      return NextResponse.next();
    }

    // Redirect to signin for protected routes
    const signInUrl = new URL(APP_ROUTES.AUTH.LOGIN, request.url);
    signInUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Handle authenticated users

  // Redirect authenticated users away from auth pages
  if (isAuthRoute) {
    return NextResponse.redirect(
      new URL(APP_ROUTES.PROTECTED.DASHBOARD, request.url)
    );
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|api).*)", "/"],
};
