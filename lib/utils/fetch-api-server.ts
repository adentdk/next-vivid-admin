import { cookies } from "next/headers";

import "server-only";

import { getSession } from "../session/cookie";

import { FetchApi } from "./fetch-api";

const { BASE_API_URL = "http://localhost:3001", X_API_KEY = "api-key" } =
  process.env;

export class FetchApiServer extends FetchApi {
  constructor() {
    super(BASE_API_URL);
  }

  protected async getHeaders(customHeaders: Record<string, any> = {}) {
    const headers = await super.getHeaders(customHeaders);
    headers["x-api-key"] = X_API_KEY;

    const idToken = await getSession(cookies());

    if (idToken) {
      headers["Authorization"] = `Bearer ${idToken}`;
    }

    return headers;
  }
}
