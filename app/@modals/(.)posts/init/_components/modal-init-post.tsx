"use client";

import { useRouter } from "next/navigation";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { FormInput } from "@/components/forms/form-input";
import { createTypedFormField } from "@/components/hocs/create-typed-form-field";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/ui/submit-button";

import {
  initPostSchema,
  InitPostSchemaType,
} from "../_schemas/init-post.schema";

const FormField = createTypedFormField<InitPostSchemaType>();

export default function ModalInitPost() {
  const router = useRouter();

  const formMethods = useForm({
    resolver: yupResolver(initPostSchema),
  });

  const { handleSubmit } = formMethods;

  return (
    <Dialog
      open
      onOpenChange={(v) => {
        if (!v) router.back();
      }}
    >
      <DialogContent>
        <Form {...formMethods}>
          <form
            action={() =>
              handleSubmit(
                (f) => {
                  console.log(f);
                },
                (e) => {
                  console.error(e);
                },
              )()
            }
          >
            <DialogHeader>
              <DialogTitle>Init Post</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 mb-4">
              <FormField
                name="title"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    label="Title"
                    placeholder="Enter title"
                    mandatory
                  />
                )}
              />

              <FormField
                name="locale"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    label="Locale"
                    placeholder="Enter locale"
                    mandatory
                  />
                )}
              />
            </div>

            <DialogFooter>
              <SubmitButton>Submit</SubmitButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
