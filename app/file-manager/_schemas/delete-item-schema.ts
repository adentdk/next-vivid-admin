import { InferType, object, ref, string } from 'yup';

export const deleteItemSchema = object().shape({
  realName: string().required(),
  confirmName: string()
    .required()
    .oneOf([ref('realName')], 'Nama tidak cocok'),
});

export type DeleteItemSchemaType = InferType<typeof deleteItemSchema>;
