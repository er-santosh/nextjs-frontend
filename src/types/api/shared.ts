import type { API_ERROR_CODES } from "@/constants/error-codes";

export type ApiErrorCode =
  (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  code: ApiErrorCode;
  data?: T;
  errors?: ValidationError[];
}

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  name?: string; // this will be added in frontend for easy access
  email: string;
  role: UserRole;
  email_verified_at: string | null;
  last_login_attempt: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
