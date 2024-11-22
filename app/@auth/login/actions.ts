"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { fetcher } from "@/app/api-fetcher";
import { createSession } from "@/lib/session/cookie";

export async function getCustomTokenAction(idToken: string) {
  const customTokenResult = await fetcher<{
    customToken: string;
  }>("/v1/auth/firebase-login", {
    method: "POST",
    body: { idToken },
  });

  return customTokenResult;
}

export async function createSessionAction(idToken: string) {
  await createSession(cookies(), idToken);

  revalidatePath("/", "layout");
}
