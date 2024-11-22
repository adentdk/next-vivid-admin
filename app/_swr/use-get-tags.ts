import useSWR, { SWRConfiguration } from "swr";

import { PaginatedResponse, PostTagType } from "@/lib/types";

import { fetcher } from "../api-fetcher";

type GetTagParams = {
  locale: string;
  limit?: number;
  pointer?: string;
  search?: string;
};

export function useGetTags(
  p?: GetTagParams,
  options?: SWRConfiguration<PaginatedResponse<PostTagType>>,
) {
  return useSWR(
    ["/v1/post-tags/manage", p],
    async ([url, params]) => {
      return fetcher<PaginatedResponse<PostTagType>>(url, { params }).then(
        (res) => {
          if (res.success) {
            return res.data;
          }
          throw new Error(res.message);
        },
      );
    },
    options,
  );
}
