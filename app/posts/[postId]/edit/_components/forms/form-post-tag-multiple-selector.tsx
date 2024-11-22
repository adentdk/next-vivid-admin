"use client";

import { forwardRef, useMemo } from "react";

import { useGetTags } from "@/app/_swr/use-get-tags";
import { FormMultiSelectorMap } from "@/components/forms/form-multi-selector-map";

export const FormPostTagMultipleSelector = forwardRef<
  React.ElementRef<typeof FormMultiSelectorMap>,
  Omit<React.ComponentPropsWithoutRef<typeof FormMultiSelectorMap>, "items"> & {
    locale: string;
  }
>(({ disabled, onChange, locale, ...props }, ref) => {
  const { data, isLoading } = useGetTags({ locale });

  const items = useMemo(() => {
    if (isLoading) return [];

    return (
      data?.items?.map((tag) => ({
        label: tag.name,
        value: tag.id,
      })) ?? []
    );
  }, [data, isLoading]);

  return <FormMultiSelectorMap items={items} {...props} ref={ref} />;
});

FormPostTagMultipleSelector.displayName = "FormPostTagMultipleSelector";
