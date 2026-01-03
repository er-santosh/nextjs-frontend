import { AuthenticatedRequest } from "@/services/requests/authenticated";
import { UnauthenticatedRequest } from "@/services/requests/unauthenticated";

import { CookieStorage } from "@/lib/cookie-storage";

import type { LoginInput, RegisterInput } from "@/schemas/auth";

import type {
  GetCurrentUserResponse,
  LoginResponse,
  RegisterResponse,
} from "@/types/api/auth";

class AuthService {
  private publicRequest: UnauthenticatedRequest;
  private protectedRequest: AuthenticatedRequest;

  constructor() {
    this.publicRequest = new UnauthenticatedRequest();
    this.protectedRequest = new AuthenticatedRequest();
  }

  async login(credentials: LoginInput): Promise<LoginResponse> {
    const response = await this.publicRequest.post<LoginResponse, LoginInput>(
      "/auth/login",
      { data: credentials }
    );

    const responseData = response.data;

    if (!responseData.data?.tokens) {
      throw new Error("No tokens returned from login");
    }

    CookieStorage.setTokens(
      responseData.data.tokens.accessToken,
      responseData.data.tokens.refreshToken
    );

    return responseData;
  }

  async register(userData: RegisterInput): Promise<RegisterResponse> {
    const response = await this.publicRequest.post<
      RegisterResponse,
      RegisterInput
    >("/auth/register", { data: userData });

    const responseData = response.data;

    if (!responseData.data?.user) {
      throw new Error("No user returned from registration");
    }

    return responseData;
  }

  async logout(): Promise<void> {
    try {
      await this.protectedRequest.post("/auth/logout");
    } finally {
      CookieStorage.clearTokens();
    }
  }

  async getCurrentUser(): Promise<GetCurrentUserResponse> {
    const response =
      await this.protectedRequest.get<GetCurrentUserResponse>("/auth/me");

    const responseData = response.data;

    if (!responseData.data?.user) {
      throw new Error("No user data returned");
    }

    return responseData;
  }

  hasValidSession(): boolean {
    return CookieStorage.hasTokens();
  }
}

export const authService = new AuthService();
