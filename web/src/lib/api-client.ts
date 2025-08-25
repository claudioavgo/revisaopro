interface ApiClientOptions {
  baseUrl: string;
  timeout?: number;
  withCredentials?: boolean;
  responseWrapper?: string;
}

interface RequestOptions {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}

class ApiClientError extends Error {
  constructor(
    public status: number,
    message: string,
    public response?: unknown,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export class ApiClient {
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly withCredentials: boolean;
  private readonly responseWrapper?: string;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.timeout = options.timeout ?? 10000;
    this.withCredentials = options.withCredentials ?? true;
    this.responseWrapper = options.responseWrapper;
  }

  private async request<T = unknown>(
    method: string,
    endpoint: string,
    options: RequestOptions & { body?: unknown } = {},
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        method,
        credentials: this.withCredentials ? "include" : "omit",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new ApiClientError(
          response.status,
          errorData?.message || response.statusText,
          errorData,
        );
      }

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const data = await response.json();

        // Se há um wrapper configurado, extrair o valor encapsulado
        if (
          this.responseWrapper &&
          data &&
          typeof data === "object" &&
          this.responseWrapper in data
        ) {
          return data[this.responseWrapper];
        }

        return data;
      }

      return response.text() as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof ApiClientError) {
        throw error;
      }

      throw new ApiClientError(0, error instanceof Error ? error.message : "Request failed");
    }
  }

  get<T = unknown>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", endpoint, options);
  }

  post<T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("POST", endpoint, { ...options, body });
  }

  put<T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>("PUT", endpoint, { ...options, body });
  }

  delete<T = unknown>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", endpoint, options);
  }

  getWrapped<T = unknown>(endpoint: string, wrapper: string, options?: RequestOptions): Promise<T> {
    return this.requestWithWrapper<T>("GET", endpoint, wrapper, options);
  }

  postWrapped<T = unknown>(
    endpoint: string,
    wrapper: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.requestWithWrapper<T>("POST", endpoint, wrapper, { ...options, body });
  }

  putWrapped<T = unknown>(
    endpoint: string,
    wrapper: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return this.requestWithWrapper<T>("PUT", endpoint, wrapper, { ...options, body });
  }

  deleteWrapped<T = unknown>(
    endpoint: string,
    wrapper: string,
    options?: RequestOptions,
  ): Promise<T> {
    return this.requestWithWrapper<T>("DELETE", endpoint, wrapper, options);
  }

  private async requestWithWrapper<T = unknown>(
    method: string,
    endpoint: string,
    wrapper: string,
    options: RequestOptions & { body?: unknown } = {},
  ): Promise<T> {
    const response = await this.request<Record<string, unknown>>(method, endpoint, options);

    if (response && typeof response === "object" && wrapper in response) {
      return response[wrapper] as T;
    }

    return response as T;
  }
}
