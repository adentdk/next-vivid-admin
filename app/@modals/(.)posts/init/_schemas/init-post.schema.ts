import { array, InferType, object, string } from "yup";

export const initPostSchema = object().shape({
  title: string().required(),
  locale: string().required(),
  categoryIds: array().of(string().required()).required().min(1),
});

export type InitPostSchemaType = InferType<typeof initPostSchema>;
