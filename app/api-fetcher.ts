"use server";

import { FetchApiConfig } from "@/lib/utils/fetch-api";
import { FetchApiServer } from "@/lib/utils/fetch-api-server";

export async function fetcher<T>(
  url: string,
  { next, ...config }: Omit<FetchApiConfig, "url"> = {},
) {
  const api = new FetchApiServer();
  const result = await api.fetch<T>({
    ...config,
    url,
    next: {
      tags: [url],
      ...next,
    },
  });

  return result.toJson();
}
