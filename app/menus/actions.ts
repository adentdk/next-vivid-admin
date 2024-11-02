"use server";

import { revalidatePath } from "next/cache";

import {
  createMenuQuery,
  CreateMenuType,
} from "@/libs/prisma/queries/create-menu.query";

export async function createMenuAction(data: CreateMenuType) {
  const result = await createMenuQuery(data);

  revalidatePath("/engine/menu");

  return result;
}
