"use client";

import { useMemo } from "react";

import { FormSelectMap } from "@/components/forms/form-select-map";

export function FormLocaleSelectMap({
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof FormSelectMap>, "items">) {
  const items = useMemo(() => {
    return [
      { value: "en", label: "English" },
      { value: "id", label: "Bahasa Indonesia" },
    ];
  }, []);

  return <FormSelectMap {...props} items={items} />;
}
