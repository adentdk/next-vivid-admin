import useSWR from "swr";

import { PostCategoryTypeWithChildren } from "@/lib/types";

import { fetcher } from "../api-fetcher";

export function useGetCategories() {
  return useSWR("/v1/post-categories/manage/hierarchy", (url) => {
    return fetcher<PostCategoryTypeWithChildren[]>(url).then((res) => {
      if (res.success) {
        return res.data;
      }
      throw new Error(res.message);
    });
  });
}
