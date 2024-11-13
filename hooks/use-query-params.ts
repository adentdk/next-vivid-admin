import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function useQueryParams(): [
  Record<string, string>,
  (params: Record<string, string>) => void,
] {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParams = useMemo<Record<string, string>>(() => {
    return Object.fromEntries(searchParams);
  }, [searchParams]);

  const setQueryParams = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams();
      for (const key in params) {
        if (params[key] === null || typeof params[key] === "undefined") {
          newSearchParams.delete(key);
          continue;
        }
        newSearchParams.set(key, params[key]);
      }

      router.push(`?${newSearchParams.toString()}`, {});
    },
    [router],
  );

  return [queryParams, setQueryParams];
}
