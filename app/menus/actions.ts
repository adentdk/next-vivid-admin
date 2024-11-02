"use server";

import { revalidatePath } from "next/cache";

export async function createMenuAction(data: any) {
  // const result = await createMenuQuery(data);

  revalidatePath("/engine/menu");

  // return result;
}
