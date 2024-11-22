"use client";

import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { formatDistanceToNow } from "date-fns";
import { useForm } from "react-hook-form";

import { FormTagsInput } from "@/components/forms/form-tags-input";
import { FormTextArea } from "@/components/forms/form-textarea";
import { createTypedFormField } from "@/components/hocs/create-typed-form-field";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import SubmitButton from "@/components/ui/submit-button";
import { TagsInput } from "@/components/ui/tags-input";

import { putEditPost } from "../_actions/put-edit-post";
import {
  editPostSchema,
  EditPostSchemaType,
} from "../_schemas/edit-post.schema";
import { useThisStore } from "../store-provider";

import { FormPostCategorySelectMap } from "./forms/form-post-category-select-map";
import { FormPostTagMultipleSelector } from "./forms/form-post-tag-multiple-selector";
import { Editor } from "./editor";

const FormField = createTypedFormField<EditPostSchemaType>();

export function EditPostForm() {
  const defaultPost = useThisStore((s) => s.post);

  const formMethods = useForm({
    resolver: yupResolver(editPostSchema),
    defaultValues: {
      title: defaultPost?.title || "",
      seoTitle: defaultPost?.seoTitle || defaultPost?.title || "",
      seoDescription: defaultPost?.seoDescription || "",
      categoryIds: defaultPost?.categoryIds ?? [],
      tagIds: defaultPost?.tagIds ?? [],
      locationTag: defaultPost?.locationTag ?? [],
      keywords: defaultPost?.keywords ?? [],
      alternatePostIds: defaultPost?.alternatePostIds ?? [],
      publishTime: defaultPost?.publishTime || "",
      content: `<h1>${defaultPost?.title ?? ""}</h1>${defaultPost?.content || ""}`,
    },
  });

  const { handleSubmit } = formMethods;

  const handleSave = useCallback(
    (submitter: "schedule" | "publish" | "draft") =>
      async (data: EditPostSchemaType & { [key: string]: any }) => {
        if (!defaultPost) return;
        const formData = new FormData();

        for (const key in data) {
          if (key === "mainImage" && data[key] instanceof File) {
            formData.append(key, data[key]);
          } else if (Array.isArray(data[key])) {
            data[key].forEach((value) => {
              formData.append(key, value);
            });
          } else {
            formData.append(key, data[key]);
          }
        }

        await putEditPost(defaultPost.id, formData);
      },
    [defaultPost],
  );

  return (
    <Form {...formMethods}>
      <form
        action={(f) =>
          handleSubmit(
            handleSave((f.get("submitter") || "publish") as any),
            (e) => console.log(e),
          )()
        }
        className="flex h-screen overflow-hidden"
      >
        <Editor />
        <ScrollArea className="w-[32rem] flex flex-col space-y-2 border-l">
          <div className="px-4 pb-2 flex flex-wrap justify-end gap-2 sticky top-0 bg-background border-b">
            <SubmitButton name="submitter" value="publish" variant="default">
              Publish
            </SubmitButton>
            <SubmitButton name="submitter" value="schedule" variant="secondary">
              Schedule Post
            </SubmitButton>
            <SubmitButton name="submitter" value="draft" variant="outline">
              Save Draft
            </SubmitButton>
          </div>
          <div className="px-4 py-2 flex justify-between">
            <p>Locale</p>
            <p className="uppercase">{defaultPost?.locale}</p>
          </div>
          <div className="px-4 py-2 flex justify-between">
            <p>
              Saved as&nbsp;
              <span className="font-bold uppercase">{defaultPost?.status}</span>
            </p>
            <p className="text-sm">
              {formatDistanceToNow(new Date(defaultPost?.updateTime || ""), {
                includeSeconds: true,
              })}
            </p>
          </div>
          <Separator />

          <Accordion
            type="multiple"
            defaultValue={[
              "seoTitle",
              "description",
              "categories",
              "tags",
              "keywords",
              "dateLocation",
            ]}
          >
            <AccordionItem className="px-4" value="seoTitle">
              <AccordionTrigger>
                <Label>SEO Title</Label>
              </AccordionTrigger>
              <AccordionContent className="px-2 pt-2">
                <FormField
                  name="seoTitle"
                  defaultValue=""
                  render={({ field }) => (
                    <FormTextArea
                      {...field}
                      maxLength={60}
                      description={`${field.value.length}/60`}
                      placeholder="Enter a catchy and concise title for your content (max 60 characters)"
                    ></FormTextArea>
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="px-4" value="description">
              <AccordionTrigger>
                <Label mandatory>SEO Description</Label>
              </AccordionTrigger>
              <AccordionContent className="px-2 pt-2">
                <FormField
                  name="seoDescription"
                  defaultValue=""
                  render={({ field }) => (
                    <FormTextArea
                      {...field}
                      maxLength={160}
                      description={`${field.value.length}/160`}
                      placeholder="Write a brief description to summarize your content (max 160 characters)"
                    />
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="px-4" value="categories">
              <AccordionTrigger>
                <Label mandatory>Hub (Category)</Label>
              </AccordionTrigger>
              <AccordionContent className="px-2 pt-2">
                <FormField
                  name="categoryIds"
                  render={({ field: { onChange, value, ...field } }) => (
                    <FormPostCategorySelectMap
                      {...field}
                      value={[...value]?.pop() ?? ""}
                      onChangeCategoryIds={onChange}
                      placeholder="Select a category"
                      mandatory
                    />
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="px-4 overflow-visible" value="tags">
              <AccordionTrigger>
                <Label>Tags</Label>
              </AccordionTrigger>
              <AccordionContent className="px-2 pt-2">
                <FormField
                  name="tagIds"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormPostTagMultipleSelector
                      {...field}
                      optional
                      values={value ?? []}
                      onValuesChange={onChange}
                      locale={defaultPost?.locale!}
                      placeholder="Add relevant tags"
                    />
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="px-4 !overflow-visible" value="keywords">
              <AccordionTrigger>
                <Label>Keywords</Label>
              </AccordionTrigger>
              <AccordionContent className="px-2 pt-2 overflow-visible">
                <FormField
                  name="keywords"
                  render={({ field: { onChange, value = [], ...field } }) => (
                    <TagsInput
                      {...field}
                      value={value}
                      onValueChange={onChange}
                      placeholder="Enter relevant keywords"
                    />
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem className="px-4" value="dateLocation">
              <AccordionTrigger>
                <Label>Location</Label>
              </AccordionTrigger>
              <AccordionContent className="px-2 pt-2">
                <FormField
                  name="locationTag"
                  render={({ field: { value = [], onChange, ...field } }) => (
                    <FormTagsInput
                      {...field}
                      value={value}
                      onValueChange={onChange}
                      label="Location tag"
                      placeholder="Enter the relevant location"
                    />
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="px-4 py-2 text-sm flex gap-4 sticky bottom-0 bg-background">
            <p>Characters: 0</p>
            <p>Words: 0</p>
          </div>
        </ScrollArea>
      </form>
    </Form>
  );
}
