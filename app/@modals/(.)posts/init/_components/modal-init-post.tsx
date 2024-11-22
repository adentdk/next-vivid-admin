"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormLocaleSelectMap } from "@/app/_components/forms/form-locale-select-map";
import { FormPostCategorySelectMap } from "@/app/posts/[postId]/edit/_components/forms/form-post-category-select-map";
import { FormInput } from "@/components/forms/form-input";
import { createTypedFormField } from "@/components/hocs/create-typed-form-field";
import { alert } from "@/components/hooks/use-alert";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/ui/submit-button";

import { postInitPost } from "../_actions/post-init-post";
import {
  initPostSchema,
  InitPostSchemaType,
} from "../_schemas/init-post.schema";

const FormField = createTypedFormField<InitPostSchemaType>();

export default function ModalInitPost() {
  const router = useRouter();
  const pathname = usePathname();

  const formMethods = useForm({
    resolver: yupResolver(initPostSchema),
    defaultValues: {
      title: "",
      locale: "",
      categoryIds: [],
    },
  });

  const { handleSubmit } = formMethods;

  const handleFormSubmit = useCallback<SubmitHandler<InitPostSchemaType>>(
    async (data) => {
      const loadingAlert = alert.loading({
        title: "Processing...",
      });

      try {
        const result = await postInitPost(data);

        if (!result.success) {
          throw new Error(result.errorMessage ?? result.message);
        }

        toast.success("Post has been initialized successfully");
        router.replace(`/posts/${result.data.postId}/edit`);
      } catch (error: any) {
        alert.default({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } finally {
        loadingAlert.dismiss();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Dialog
      open={pathname === "/posts/init"}
      onOpenChange={(v) => {
        if (!v) router.back();
      }}
    >
      <DialogContent>
        <Form {...formMethods}>
          <form action={() => handleSubmit(handleFormSubmit)()}>
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
                render={({ field: { onChange, ...field } }) => (
                  <FormLocaleSelectMap
                    {...field}
                    onValueChange={onChange}
                    label="Locale"
                    placeholder="Enter locale"
                    mandatory
                  />
                )}
              />

              <FormField
                name="categoryIds"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormPostCategorySelectMap
                    {...field}
                    value={[...value]?.pop() ?? ""}
                    onChangeCategoryIds={onChange}
                    label="Hub (Category)"
                    placeholder="Select Category"
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
