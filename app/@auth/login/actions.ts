"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createSession } from "@/lib/session/cookie";
import { FetchApiServer } from "@/lib/utils/fetch-api-server";

export async function getCustomTokenAction(idToken: string) {
  const api = new FetchApiServer();

  const customTokenResult = await api.fetch<{
    customToken: string;
  }>({
    url: "/v1/auth/firebase-login",
    method: "POST",
    body: { idToken },
  });

  if (customTokenResult.success) {
    revalidatePath("/", "layout");
  }

  return customTokenResult.toJson();
}

export async function createSessionAction(idToken: string) {
  await createSession(cookies(), idToken);
}
