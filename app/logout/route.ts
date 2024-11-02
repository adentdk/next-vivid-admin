import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { deleteSession } from "@/lib/session/cookie";

const handler = async (req: NextRequest) => {
  await deleteSession(cookies());

  return Response.redirect(`${process.env.APP_URL}/login`);
};

export const GET = handler;
export const POST = handler;
