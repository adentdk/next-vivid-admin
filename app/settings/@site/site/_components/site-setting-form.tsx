"use client";

import { Metadata } from "next";
import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { siteSchema, SiteSchemaType } from "../schemas";

type SiteFormFieldProps = {
  defaultValues?: Partial<SiteSchemaType>;
};

const SiteFormField = FormField as typeof FormField<SiteSchemaType>;

export const metadata: Metadata = {};

export default function SiteSettingForm(props: SiteFormFieldProps) {
  const { defaultValues } = props;
  const formMethods = useForm({
    resolver: yupResolver(siteSchema),
    defaultValues: {
      siteCompany: defaultValues?.siteCompany ?? "",
      siteName: defaultValues?.siteName ?? "",
      siteAbout: defaultValues?.siteAbout ?? "",
      siteWork: defaultValues?.siteWork ?? "",
      sitePhone: defaultValues?.sitePhone ?? "",
      siteFax: defaultValues?.siteFax ?? "",
      siteEmail: defaultValues?.siteEmail ?? "",
      siteAddress: defaultValues?.siteAddress ?? "",
      embedMaps: defaultValues?.embedMaps ?? "",
      embedCalculator: defaultValues?.embedCalculator ?? "",
      embedWebinar: defaultValues?.embedWebinar ?? "",
      embedCalendar: defaultValues?.embedCalendar ?? "",
      embedScript: defaultValues?.embedScript ?? "",
    },
  });

  const onSubmit = useCallback<SubmitHandler<SiteSchemaType>>(
    async (values) => {
      console.log(values);
    },
    [],
  );

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
        <SiteFormField
          name="siteCompany"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Company</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Site Company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SiteFormField
          name="siteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Name</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Site Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SiteFormField
          name="siteAbout"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site About</FormLabel>
              <FormControl>
                <Textarea placeholder="Masukkan Site About" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </Form>
  );
}
