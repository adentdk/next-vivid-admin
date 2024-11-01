import Image from 'next/image';

import { FormSiteMapPriorityInput } from '~/app/engine/_components/site-map-priority-input';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { FormFilePicker } from '~/components/ui/file-picker';
import { FormRadioGroupMap } from '~/components/ui/radio-group';
import { createTypedFormField } from '~/components/utils/create-typed-form-field';
import { MenuGroupEnum } from '~/libs/types/enum';

import { CreateMenuSchemaType } from '../_schemas/create-menu-schema';

const FormField = createTypedFormField<CreateMenuSchemaType>();

export default function MenuAdditionalInfoInputs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Info</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        <FormField
          name="icon"
          render={({ field }) => (
            <FormFilePicker
              label="Icon"
              placeholder="Choose icon"
              allowedExtensions={['svg', 'png', 'jpg', 'jpeg', 'webp']}
              value={field.value}
              onValueChange={([v]) => field.onChange(v.path)}
              description={
                <div>
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="Icon"
                      width={128}
                      height={128}
                      className="mx-auto"
                    />
                  ) : (
                    <div className="w-32 h-32 flex flex-col mx-auto space-y-2 p-2 items-center justify-center bg-foreground/10">
                      <p className="text-xs text-center font-medium">
                        Icon will be displayed here
                      </p>
                      <p className="text-xs text-center">
                        Accepted file types: svg, png, jpg, jpeg, webp
                      </p>
                    </div>
                  )}
                </div>
              }
            />
          )}
        />

        <FormField
          name="group"
          render={({ field }) => (
            <FormRadioGroupMap
              label="Group"
              onValueChange={(v) => field.onChange(+v)}
              value={field.value.toString()}
              items={[
                { value: MenuGroupEnum.Default.toString(), label: 'Default' },
                { value: MenuGroupEnum.Top.toString(), label: 'Top' },
                { value: MenuGroupEnum.Bottom.toString(), label: 'Bottom' },
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
                field.onChange(v === 'true');
              }}
              value={field.value.toString()}
              items={[
                { value: true.toString(), label: 'Enable' },
                { value: false.toString(), label: 'Disable' },
              ]}
            />
          )}
        />

        <FormField
          name="sitemapPriority"
          defaultValue={1}
          render={({ field: { value, onChange } }) => (
            <FormSiteMapPriorityInput
              label="Site Map Priority"
              value={value?.toString() ?? ''}
              onValueChange={onChange}
            />
          )}
        />
      </CardContent>
    </Card>
  );
}
