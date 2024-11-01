"use server";

import { FetchApi } from "./fetch-api";

export class FetchApiServer extends FetchApi {
  constructor() {
    super(process.env.BASE_API_URL as string);
  }

  protected getHeaders(
    customHeaders: Record<string, any> = {},
  ): Record<string, any> {
    return {
      ...super.getHeaders(customHeaders),
      "x-api-key": process.env.X_API_KEY,
    };
  }
}
