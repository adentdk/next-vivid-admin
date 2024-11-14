import { InferType, object, string } from "yup";

export const initPostSchema = object().shape({
  title: string().required(),
  locale: string().required(),
  categoryId: string().required(),
});

export type InitPostSchemaType = InferType<typeof initPostSchema>;
