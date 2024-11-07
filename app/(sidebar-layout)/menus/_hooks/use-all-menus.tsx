"use client";

import { SWRConfiguration } from "swr";
import useSWRImmutable from "swr/immutable";

import { getMenusRecursiveQuery } from "@/libs/prisma/queries/get-menu-recursive.query";

type UseGetAllMenusRecursiveParams = {
  disabled?: boolean;
  options?: SWRConfiguration;
};

export const useGetAllMenusRecursive = ({
  disabled = false,
  options,
}: UseGetAllMenusRecursiveParams) => {
  return useSWRImmutable(
    !disabled ? ["/get-all-menus-recursive"] : null,
    async () => {
      try {
        return await getMenusRecursiveQuery();
      } catch (error) {
        return [];
      }
    },
    options,
  );
};
