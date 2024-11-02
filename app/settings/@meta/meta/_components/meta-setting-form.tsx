"use client";

import { Metadata } from "next";
import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { metaSchema, MetaSchemaType } from "../schemas";

import SectionBasicInputs from "./section-basic-inputs";
import SectionOpenGraphInputs from "./section-open-graph-inputs";

type MetaSettingFormProps = {
  defaultValues?: Partial<MetaSchemaType>;
};

export const metadata: Metadata = {};

export default function MetaSettingForm(props: MetaSettingFormProps) {
  const { defaultValues } = props;
  const formMethods = useForm({
    resolver: yupResolver(metaSchema),
    defaultValues: {},
  });

  const onSubmit = useCallback<SubmitHandler<MetaSchemaType>>(
    async (values) => {
      console.log(values);
    },
    [],
  );

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
        <SectionBasicInputs />

        <SectionOpenGraphInputs />

        <div className="flex justify-end">
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </Form>
  );
}
