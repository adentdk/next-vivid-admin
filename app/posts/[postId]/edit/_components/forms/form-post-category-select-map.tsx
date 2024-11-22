"use client";

import { forwardRef, useMemo } from "react";

import { useGetCategories } from "@/app/_swr/use-get-categories";
import { FormSelectMap } from "@/components/forms/form-select-map";

export const FormPostCategorySelectMap = forwardRef<
  HTMLDivElement,
  Omit<React.ComponentPropsWithoutRef<typeof FormSelectMap>, "items"> & {
    onChangeCategoryIds?: (v: string[]) => void;
  }
>(({ disabled, onValueChange, onChangeCategoryIds, ...props }, ref) => {
  const { data, isLoading } = useGetCategories();

  const items = useMemo(() => {
    return (
      data?.map((category) => ({
        value: category.id,
        label: category.name,
        items:
          category.children?.map((child) => ({
            value: child.id,
            label: `${category.name} > ${child.name}`,
          })) || [],
      })) || []
    );
  }, [data]);

  const handleValueChange = (selectedValue: string) => {
    onValueChange?.(selectedValue);

    if (onChangeCategoryIds) {
      const selectedCategoryIds = items.flatMap((category) =>
        category.value === selectedValue ||
        category.items.some((child) => child.value === selectedValue)
          ? [
              category.value,
              ...category.items
                .filter((child) => child.value === selectedValue)
                .map((child) => child.value),
            ]
          : [],
      );

      onChangeCategoryIds(selectedCategoryIds);
    }
  };

  return (
    <FormSelectMap
      {...props}
      ref={ref as any}
      onValueChange={handleValueChange}
      disabled={isLoading || disabled}
      items={items}
    />
  );
});

FormPostCategorySelectMap.displayName = "FormPostCategorySelectMap";
