"use server";

import { revalidateTag } from "next/cache";

import { fetcher } from "@/app/api-fetcher";

export type InitPostData = {
  title: string;
  locale: string;
  categoryIds: string[];
};

export async function postInitPost(data: InitPostData) {
  const result = await fetcher<{ postId: string }>("/v1/posts/manage/init", {
    method: "POST",
    body: data,
  });

  revalidateTag("/v1/posts/manage");

  return result;
}
