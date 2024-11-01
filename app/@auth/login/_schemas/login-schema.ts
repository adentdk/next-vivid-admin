import { InferType, object, string } from "yup";

export const loginSchema = object().shape({
  email: string().email().required().default(""),
  password: string().min(6).required().default(""),
});

export type LoginSchemaType = InferType<typeof loginSchema>;
