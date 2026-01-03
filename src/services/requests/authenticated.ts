import type { AxiosError, InternalAxiosRequestConfig } from "axios";

import { BaseRequest } from "@/services/requests/base";

import { env } from "@/config/env";

import { CookieStorage } from "@/lib/cookie-storage";
import { TokenRefreshQueue } from "@/lib/utils/token-refresh-queue";

import type { RefreshTokenResponse } from "@/types/api/auth";

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export class AuthenticatedRequest extends BaseRequest {
  private refreshQueue: TokenRefreshQueue;

  constructor() {
    super(env.NEXT_PUBLIC_API_URL, true);
    this.refreshQueue = new TokenRefreshQueue();
  }

  protected setupInterceptors(): void {
    this.client.interceptors.request.use(
      config => {
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as RetryConfig;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.refreshQueue.getIsRefreshing()) {
            return new Promise((resolve, reject) => {
              this.refreshQueue.subscribe(err => {
                if (err) {
                  reject(err);
                } else {
                  resolve(this.client(originalRequest));
                }
              });
            });
          }

          originalRequest._retry = true;
          this.refreshQueue.setIsRefreshing(true);

          try {
            const refreshToken = CookieStorage.getRefreshToken();

            if (!refreshToken) {
              throw new Error("No refresh token available");
            }

            const response = await this.client.post<RefreshTokenResponse>(
              "/auth/refresh",
              { refreshToken }
            );

            const newTokens = response.data.data?.tokens;

            if (!newTokens) {
              throw new Error("No tokens returned from refresh");
            }

            CookieStorage.setTokens(
              newTokens.accessToken,
              newTokens.refreshToken
            );

            this.refreshQueue.setIsRefreshing(false);
            this.refreshQueue.notifySubscribers();

            return this.client(originalRequest);
          } catch (refreshError) {
            this.refreshQueue.setIsRefreshing(false);
            this.refreshQueue.notifySubscribers(refreshError as Error);
            this.refreshQueue.clearSubscribers();
            CookieStorage.clearTokens();

            if (typeof window !== "undefined") {
              const currentPath = window.location.pathname;
              const callbackUrl = encodeURIComponent(currentPath);
              window.location.href = `/login?callbackUrl=${callbackUrl}`;
            }

            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }
}
