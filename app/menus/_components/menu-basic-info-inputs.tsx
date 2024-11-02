"use client";

import { Fragment, useEffect } from "react";

import { useFormContext, useWatch } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormInput } from "@/components/ui/input";
import { FormRadioGroupMap } from "@/components/ui/radio-group";
import { FormTextarea } from "@/components/ui/textarea";
import { createTypedFormField } from "@/components/utils/create-typed-form-field";
import { MenuLinkTargetEnum, MenuLinkTypeEnum } from "@/libs/types/enum";

import { CreateMenuSchemaType } from "../_schemas/create-menu-schema";

import { FormSelectParentInput } from "./select-parent-input";

const FormField = createTypedFormField<CreateMenuSchemaType>();

export default function MenuBasicInfoInputs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <FormField
          name="name"
          render={({ field }) => (
            <FormInput
              label="Name"
              mandatory
              placeholder="Enter menu name"
              {...field}
            />
          )}
        />

        <FormField
          name="description"
          render={({ field: { value, onChange } }) => (
            <FormTextarea
              label="Description"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <HrefOrCategory />

        <FormField
          name="linkTarget"
          render={({ field }) => (
            <FormRadioGroupMap
              label="Link Target"
              onValueChange={(v) => field.onChange(parseInt(v, 10))}
              value={field.value.toString()}
              items={[
                {
                  value: MenuLinkTargetEnum.CurrentTab.toString(),
                  label: "Current Tab",
                },
                {
                  value: MenuLinkTargetEnum.Blank.toString(),
                  label: "New Tab",
                },
              ]}
            />
          )}
        />

        <FormField
          name="parentId"
          render={({ field: { value, onChange } }) => (
            <FormSelectParentInput
              label="Parent Menu"
              value={value?.toString() ?? ""}
              placeholder="Choose parent menu (optional)"
              onValueChange={(v) => onChange(parseInt(v, 10))}
            />
          )}
        />
      </CardContent>
    </Card>
  );
}

const HrefOrCategory = () => {
  const linkType = useWatch({ name: "linkType" });
  const { resetField } = useFormContext<CreateMenuSchemaType>();

  useEffect(() => {
    resetField("href", {});
    resetField("categoryId", {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkType]);

  return (
    <Fragment>
      <FormField
        name="linkType"
        render={({ field }) => (
          <FormRadioGroupMap
            label="Connect to"
            onValueChange={(v) => field.onChange(parseInt(v, 10))}
            value={field.value.toString()}
            items={[
              {
                value: MenuLinkTypeEnum.Href.toString(),
                label: "URL (href)",
              },
              {
                value: MenuLinkTypeEnum.Category.toString(),
                label: "Category",
              },
            ]}
          />
        )}
      />

      {linkType === MenuLinkTypeEnum.Href ? (
        <FormField
          name="href"
          render={({ field }) => (
            <FormInput
              label="URL (href)"
              placeholder="Enter URL"
              mandatory
              description={
                <Fragment>
                  Type <strong>http://www.otherdomain.com</strong> to go to
                  other domain or type <strong>about</strong> to go to
                  http://www.yourdomain.com/about
                </Fragment>
              }
              {...field}
            />
          )}
        />
      ) : (
        <FormField
          name="categoryId"
          render={({ field }) => (
            <FormInput
              label="Kategori"
              placeholder="Masukkan kategori"
              {...field}
            />
          )}
        />
      )}
    </Fragment>
  );
};
