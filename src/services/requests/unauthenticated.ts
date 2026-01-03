import type { AxiosError } from "axios";

import { BaseRequest } from "@/services/requests/base";

import { env } from "@/config/env";

export class UnauthenticatedRequest extends BaseRequest {
  constructor() {
    super(env.NEXT_PUBLIC_API_URL, true);
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
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }
}
