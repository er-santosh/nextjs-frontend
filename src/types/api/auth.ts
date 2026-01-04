import type { ApiResponse, AuthTokens, User } from "@/types/api/shared";

export type RegisterResponseData = {
  user: User;
};

export type RegisterResponse = ApiResponse<RegisterResponseData>;

export type LoginResponseData = {
  user: User;
  tokens: AuthTokens;
};

export type LoginResponse = ApiResponse<LoginResponseData>;

export type RefreshTokenResponseData = {
  tokens: AuthTokens;
};

export type RefreshTokenResponse = ApiResponse<RefreshTokenResponseData>;

export type GetCurrentUserResponseData = {
  user: User;
};

export type GetCurrentUserResponse = ApiResponse<GetCurrentUserResponseData>;

export type ResendVerificationEmailResponse = ApiResponse<null>;

export type VerifyEmailResponse = ApiResponse<null>;
