import { cookies } from "next/headers";

import { createSession } from "@/lib/session/cookie";

export async function POST(req: Request) {
  const { idToken } = await req.json();

  await createSession(cookies(), idToken);

  return Response.json({ message: "OK" });
}
