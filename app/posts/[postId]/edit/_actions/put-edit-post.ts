"use server";

import { revalidateTag } from "next/cache";

import { fetcher } from "@/app/api-fetcher";

export async function putEditPost(postId: string, formData: FormData) {
  const result = await fetcher(`/v1/posts/manage/${postId}`, {
    method: "PUT",
    body: formData,
  });

  if (result.success) {
    revalidateTag("/v1/posts/manage");
  }

  console.log(result);
  return result;
}
