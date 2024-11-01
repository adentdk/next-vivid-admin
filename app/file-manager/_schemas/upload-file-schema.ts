import { InferType, mixed, object, string } from 'yup';

export const uploadFileSchema = object().shape({
  file: object().shape({
    value: string().required('File is required'),
    blob: mixed<File>().required('File is required'),
  }),
});

export type UploadFileSchemaType = InferType<typeof uploadFileSchema>;
