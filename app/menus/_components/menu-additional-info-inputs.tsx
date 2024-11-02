import { FormRadioGroupMap } from "@/components/forms/form-radio-group-map";
import { createTypedFormField } from "@/components/hocs/create-typed-form-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MenuGroupEnum } from "@/lib/types";

import { CreateMenuSchemaType } from "../_schemas/create-menu-schema";

const FormField = createTypedFormField<CreateMenuSchemaType>();

export default function MenuAdditionalInfoInputs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Info</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <FormField
          name="group"
          render={({ field }) => (
            <FormRadioGroupMap
              label="Group"
              onValueChange={(v) => field.onChange(+v)}
              value={field.value.toString()}
              items={[
                { value: MenuGroupEnum.Default.toString(), label: "Default" },
                { value: MenuGroupEnum.Top.toString(), label: "Top" },
                { value: MenuGroupEnum.Bottom.toString(), label: "Bottom" },
              ]}
            />
          )}
        />

        <FormField
          name="status"
          render={({ field }) => (
            <FormRadioGroupMap
              label="Status"
              onValueChange={(v) => {
                field.onChange(v === "true");
              }}
              value={field.value.toString()}
              items={[
                { value: true.toString(), label: "Enable" },
                { value: false.toString(), label: "Disable" },
              ]}
            />
          )}
        />
      </CardContent>
    </Card>
  );
}
