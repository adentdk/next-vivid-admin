import { objectToQueryString } from "./query-string";
import { BaseApiResponse } from "./response";

export interface FetchApiConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Record<string, any>;
  body?: Record<string, any> | FormData;
  next?: NextFetchRequestConfig;
  headers?: Record<string, any>;
  cache?: RequestInit["cache"];
}

export class FetchApi {
  protected baseUrl: string;
  private controller: AbortController | null = null;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  protected async getHeaders(
    customHeaders: Record<string, any> = {},
  ): Promise<Record<string, any>> {
    return {
      "Content-Type": "application/json",
      ...customHeaders,
    };
  }

  private buildFullUrl(url: string, params?: Record<string, any>): string {
    return `${this.baseUrl}${url}${params ? `?${objectToQueryString(params)}` : ""}`;
  }

  private async createRequestConfig(
    method: string,
    headers: Record<string, any>,
    body?: any,
    cache?: RequestInit["cache"],
    next?: NextFetchRequestConfig,
  ): Promise<RequestInit> {
    this.controller = new AbortController();
    const config: RequestInit = {
      method,
      headers: await this.getHeaders(headers),
      credentials: "same-origin",
      redirect: "follow",
      cache: typeof next === "undefined" ? "no-cache" : cache,
      signal: this.controller.signal,
      next,
    };

    if (body) {
      if (body instanceof FormData) {
        const headers = config.headers as Record<string, any>;
        if (headers && headers["Content-Type"]) {
          delete headers["Content-Type"];
        }
        config.body = body;
      } else {
        config.body = JSON.stringify(body);
      }
    }

    return config;
  }

  public cancelRequest(): void {
    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }
  }

  async fetch<T, R = Record<string, any>>(
    config: FetchApiConfig,
  ): Promise<BaseApiResponse<T, R>> {
    const {
      url,
      method = "GET",
      params,
      body,
      headers = {},
      cache,
      next,
    } = config;

    const fullUrl = this.buildFullUrl(url, params);

    try {
      const requestConfig = await this.createRequestConfig(
        method,
        headers,
        body,
        cache,
        next,
      );

      const res = await fetch(fullUrl, requestConfig);

      if (res.status === 204) {
        return new BaseApiResponse({
          success: true,
          code: 204,
          message: "No Content",
          data: null as T,
        });
      }

      let results;
      try {
        results = await res.json();
      } catch (error) {
        results = {};
      }

      if (res.ok && typeof results) {
        return new BaseApiResponse({
          success: true,
          code: res.status,
          message: results?.message ?? res.statusText,
          data: results?.data ?? results,
          response: results,
        });
      }

      return new BaseApiResponse({
        success: results?.success ?? false,
        code: results?.code ?? res.status,
        message: results?.message ?? res.statusText,
        error: results?.error ?? null,
        response: results,
      });
    } catch (error: any) {
      if (error.name === "AbortError") {
        return new BaseApiResponse({
          success: false,
          code: 499,
          message: "Request was canceled",
          error: "Request aborted",
          response: {} as R,
        });
      }
      throw error; // Rethrow other types of errors
    }
  }
}
