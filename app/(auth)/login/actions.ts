"use server";

import { FetchApiServer } from "@/lib/utils/fetch-api-server";

export async function getCustomTokenAction(idToken: string) {
  const api = new FetchApiServer();

  const customTokenResult = await api.fetch<{
    customToken: string;
  }>({
    url: "/v1/auth/firebase/login",
    method: "POST",
    body: { idToken },
  });

  return customTokenResult.toJson();
}
