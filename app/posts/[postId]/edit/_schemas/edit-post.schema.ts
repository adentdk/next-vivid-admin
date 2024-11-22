import { array, date, InferType, mixed, object, string } from "yup";

import { Option } from "@/components/ui/multi-selector";

export const editPostSchema = object().shape({
  title: string().required(),
  seoTitle: string().required().max(60),
  seoDescription: string().required().max(160),
  mainImage: mixed<File>().optional(),
  categoryIds: array().of(string().required()).required().min(1),
  tagIds: array().of(string().required()).optional(),
  tagOptions: array().of(mixed<Option>().required()).optional(),
  keywords: array().of(string().required()).optional(),
  content: string().required(),
  locationTag: array().of(string().required()).optional(),
  alternatePostIds: array().of(string().required()).optional(),
  publishTime: string().optional(),
});

export type EditPostSchemaType = InferType<typeof editPostSchema>;
