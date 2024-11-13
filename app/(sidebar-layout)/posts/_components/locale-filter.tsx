"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useQueryParams from "@/hooks/use-query-params";
import { LocaleEnum } from "@/lib/types";

export function LocaleFilter() {
  const [queryParams, setQueryParams] = useQueryParams();

  return (
    <Tabs
      value={queryParams.locale ?? LocaleEnum.ID}
      onValueChange={(value) => setQueryParams({ locale: value })}
    >
      <TabsList>
        <TabsTrigger value={LocaleEnum.ID}>Bahasa Indonesia</TabsTrigger>
        <TabsTrigger value={LocaleEnum.EN}>English</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
