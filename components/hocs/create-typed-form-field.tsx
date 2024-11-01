import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { FormField } from "@/components/ui/form";

export function createTypedFormField<TFieldValues extends FieldValues>() {
  return function TypedFormField<TName extends FieldPath<TFieldValues>>(
    props: Omit<ControllerProps<TFieldValues, TName>, "control">,
  ) {
    return <FormField<TFieldValues, TName> {...props} />;
  };
}
