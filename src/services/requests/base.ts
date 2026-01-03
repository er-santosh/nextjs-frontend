import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosRequestConfig,
} from "axios";

export type RequestHeaders = Record<string, string>;

export const DEFAULT_HEADERS: RequestHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const FORM_DATA_HEADERS: RequestHeaders = {
  "Content-Type": "multipart/form-data",
};

export const FILE_DOWNLOAD_HEADERS: RequestHeaders = {
  Accept: "application/octet-stream",
};

export interface GetRequestOptions {
  headers?: RequestHeaders;
  fileDownload?: boolean;
  config?: AxiosRequestConfig;
}

export interface PostRequestOptions<TData = unknown> {
  data?: TData;
  headers?: RequestHeaders;
  config?: AxiosRequestConfig;
}

export interface PatchRequestOptions<TData = unknown> {
  data?: TData;
  headers?: RequestHeaders;
  isMultiPart?: boolean;
  config?: AxiosRequestConfig;
}

export interface PutRequestOptions<TData = unknown> {
  data?: TData;
  headers?: RequestHeaders;
  isMultiPart?: boolean;
  config?: AxiosRequestConfig;
}

export interface DeleteRequestOptions {
  headers?: RequestHeaders;
  config?: AxiosRequestConfig;
}

export abstract class BaseRequest {
  protected client: AxiosInstance;

  constructor(baseURL: string, withCredentials = false) {
    this.client = axios.create({
      baseURL,
      withCredentials,
      headers: DEFAULT_HEADERS,
    });

    this.setupInterceptors();
  }

  protected abstract setupInterceptors(): void;

  protected mergeHeaders(customHeaders?: RequestHeaders): RequestHeaders {
    return { ...DEFAULT_HEADERS, ...customHeaders };
  }

  async get<TResponse>(
    url: string,
    options: GetRequestOptions = {}
  ): Promise<AxiosResponse<TResponse>> {
    const { headers, fileDownload = false, config } = options;

    const finalHeaders = fileDownload
      ? this.mergeHeaders({ ...FILE_DOWNLOAD_HEADERS, ...headers })
      : this.mergeHeaders(headers);

    return this.client.get<TResponse>(url, {
      ...config,
      headers: finalHeaders,
    });
  }

  async post<TResponse, TData = unknown>(
    url: string,
    options: PostRequestOptions<TData> = {}
  ): Promise<AxiosResponse<TResponse>> {
    const { data, headers, config } = options;

    return this.client.post<TResponse>(url, data, {
      ...config,
      headers: this.mergeHeaders(headers),
    });
  }

  async patch<TResponse, TData = unknown>(
    url: string,
    options: PatchRequestOptions<TData> = {}
  ): Promise<AxiosResponse<TResponse>> {
    const { data, headers, isMultiPart = false, config } = options;

    const finalHeaders = isMultiPart
      ? this.mergeHeaders({ ...FORM_DATA_HEADERS, ...headers })
      : this.mergeHeaders(headers);

    return this.client.patch<TResponse>(url, data, {
      ...config,
      headers: finalHeaders,
    });
  }

  async put<TResponse, TData = unknown>(
    url: string,
    options: PutRequestOptions<TData> = {}
  ): Promise<AxiosResponse<TResponse>> {
    const { data, headers, isMultiPart = false, config } = options;

    const finalHeaders = isMultiPart
      ? this.mergeHeaders({ ...FORM_DATA_HEADERS, ...headers })
      : this.mergeHeaders(headers);

    return this.client.put<TResponse>(url, data, {
      ...config,
      headers: finalHeaders,
    });
  }

  async delete<TResponse>(
    url: string,
    options: DeleteRequestOptions = {}
  ): Promise<AxiosResponse<TResponse>> {
    const { headers, config } = options;

    return this.client.delete<TResponse>(url, {
      ...config,
      headers: this.mergeHeaders(headers),
    });
  }
}
