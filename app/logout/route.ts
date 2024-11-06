import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { deleteSession } from "@/lib/session/cookie";

const handler = async (req: NextRequest) => {
  const res = NextResponse.redirect(`${process.env.APP_URL}/login`);

  await deleteSession(res.cookies);

  return res;
};

export const GET = handler;
export const POST = handler;
