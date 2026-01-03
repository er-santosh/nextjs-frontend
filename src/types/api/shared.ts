export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: ValidationError[];
}

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  rol: UserRole;
  email_verified_at: string | null;
  last_login_attempt: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
