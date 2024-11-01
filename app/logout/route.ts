import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { deleteSession } from "@/lib/session/cookie";

const handler = async (req: NextRequest) => {
  await deleteSession(cookies());
};

export const GET = handler;
export const POST = handler;
