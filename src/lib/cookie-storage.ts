import Cookies from "js-cookie";

export const TOKEN_EXPIRY = {
  ACCESS_TOKEN_IN_DAYS: 15 / (24 * 60),
  REFRESH_TOKEN_IN_DAYS: 7,
} as const;

export const COOKIE_NAMES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const;

interface CookieOptions {
  expires?: number;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  domain?: string;
}

export class CookieStorage {
  private static getOptions(expiresInDays: number): CookieOptions {
    return {
      expires: expiresInDays,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    };
  }

  static setTokens(accessToken: string, refreshToken: string): void {
    Cookies.set(
      COOKIE_NAMES.ACCESS_TOKEN,
      accessToken,
      this.getOptions(TOKEN_EXPIRY.ACCESS_TOKEN_IN_DAYS)
    );

    Cookies.set(
      COOKIE_NAMES.REFRESH_TOKEN,
      refreshToken,
      this.getOptions(TOKEN_EXPIRY.REFRESH_TOKEN_IN_DAYS)
    );
  }

  static getAccessToken(): string | null {
    const token = Cookies.get(COOKIE_NAMES.ACCESS_TOKEN);
    return typeof token === "string" ? token : null;
  }

  static getRefreshToken(): string | undefined {
    return Cookies.get(COOKIE_NAMES.REFRESH_TOKEN);
  }

  static clearTokens(): void {
    Cookies.remove(COOKIE_NAMES.ACCESS_TOKEN);
    Cookies.remove(COOKIE_NAMES.REFRESH_TOKEN);
  }

  static hasTokens(): boolean {
    return Boolean(this.getAccessToken() && this.getRefreshToken());
  }
}
