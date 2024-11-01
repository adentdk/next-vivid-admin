import "server-only";

import { FetchApi } from "./fetch-api";

const { BASE_API_URL = "http://localhost:3001", X_API_KEY = "api-key" } =
  process.env;

export class FetchApiServer extends FetchApi {
  constructor() {
    super(BASE_API_URL);
  }

  protected getHeaders(
    customHeaders: Record<string, any> = {},
  ): Record<string, any> {
    return {
      ...super.getHeaders(customHeaders),
      "x-api-key": X_API_KEY,
    };
  }
}
