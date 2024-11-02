"use client";

import { forwardRef, useMemo } from "react";

import { SelectMap, SelectMapItem } from "@/components/ui/select";
import withFormItemWrapper from "@/components/utils/with-form-item-wrapper";

const SiteMapPriorityInput = forwardRef<
  HTMLSelectElement,
  Omit<React.ComponentPropsWithoutRef<typeof SelectMap>, "items">
>((props, ref) => {
  const items = useMemo<SelectMapItem[]>(() => {
    return [
      {
        value: "0.0",
        label: "0.0",
      },
      {
        value: "0.1",
        label: "0.1",
      },
      {
        value: "0.2",
        label: "0.2",
      },
      {
        value: "0.3",
        label: "0.3",
      },
      {
        value: "0.4",
        label: "0.4",
      },
      {
        value: "0.5",
        label: "0.5",
      },
      {
        value: "0.6",
        label: "0.6",
      },
      {
        value: "0.7",
        label: "0.7",
      },
      {
        value: "0.8",
        label: "0.8",
      },
      {
        value: "0.9",
        label: "0.9",
      },
      {
        value: "1.0",
        label: "1.0",
      },
    ];
  }, []);

  return <SelectMap items={items} {...props} />;
});

SiteMapPriorityInput.displayName = "SiteMapPriorityInput";

const FormSiteMapPriorityInput = withFormItemWrapper(SiteMapPriorityInput);

export { FormSiteMapPriorityInput, SiteMapPriorityInput };
