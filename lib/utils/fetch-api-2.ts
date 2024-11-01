import { objectToQueryString } from "./query-string";
import { BaseApiResponse } from "./response";

export async function fetchApi<T, R = Record<string, any>>(
  config: {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    params?: Record<string, any>;
    body?: Record<string, any> | FormData;
    next?: NextFetchRequestConfig;
    baseUrl?: string;
    headers?: Record<string, any>;
    cache?: RequestInit["cache"];
  },
  retries = 0,
): Promise<BaseApiResponse<T, R>> {
  const {
    url,
    method = "GET",
    params,
    body,
    next,
    baseUrl = "",
    headers = {},
    cache,
  } = config;

  const fullUrl = `${baseUrl}${url}${params ? `?${objectToQueryString(params)}` : ""}`;

  const requestConfig: RequestInit & {
    headers: Record<string, any>;
  } = {
    method,
    next,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "same-origin",
    redirect: "follow",
    cache: typeof next === "undefined" ? "no-cache" : cache,
  };

  if (body instanceof FormData) {
    requestConfig.headers["Content-Type"] = body.values();
    requestConfig.body = body;
  }

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
}
