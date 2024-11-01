"use server";

import {
  RequestCookies,
  ResponseCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { Encryption } from "../utils/encryption";

const SESSION_EXPIRY_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

const { SESSION_KEY = "session", SESSION_SECRET = "session-secret" } =
  process.env;

const setCookie = (
  cookies: ReadonlyRequestCookies | RequestCookies | ResponseCookies,
  key: string,
  value: string,
  expires: Date,
) => {
  cookies.set(key, value, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: "lax",
    path: "/",
  });
};

export async function createSession(
  cookies: ReadonlyRequestCookies | RequestCookies | ResponseCookies,
  idToken: string,
): Promise<void> {
  const expires = new Date(Date.now() + SESSION_EXPIRY_DURATION);
  const session = Encryption.encrypt(SESSION_SECRET, idToken);
  setCookie(cookies, SESSION_KEY, session, expires);
}

export async function getSession(
  cookies: ReadonlyRequestCookies | RequestCookies | ResponseCookies,
): Promise<string | null> {
  const session = cookies.get(SESSION_KEY)?.value;

  if (!session) return null;

  const payload = Encryption.decrypt<string>(SESSION_SECRET, session);
  return payload;
}

export async function updateSession(
  cookies: ReadonlyRequestCookies | RequestCookies | ResponseCookies,
): Promise<void> {
  const session = cookies.get(SESSION_KEY)?.value ?? "";
  const payload = Encryption.decrypt(SESSION_SECRET, session);

  if (session && payload) {
    const expires = new Date(Date.now() + SESSION_EXPIRY_DURATION);
    setCookie(cookies, SESSION_KEY, session, expires);
  }
}

export async function deleteSession(
  cookies: ReadonlyRequestCookies | RequestCookies | ResponseCookies,
): Promise<void> {
  cookies.delete(SESSION_KEY);
}
