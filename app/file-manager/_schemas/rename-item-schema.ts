import { InferType, object, ref, string } from 'yup';

export const renameItemSchema = object().shape({
  realName: string().required(),
  newName: string()
    .required()
    .notOneOf(
      [ref('realName')],
      'New name must be different from the current name',
    ),
});

export type RenameItemSchemaType = InferType<typeof renameItemSchema>;
