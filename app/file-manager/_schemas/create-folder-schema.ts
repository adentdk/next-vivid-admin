import { InferType, object, string } from 'yup';

export const createFolderSchema = object().shape({
  name: string().required('Nama folder harus diisi'),
});

export type CreateFolderSchemaType = InferType<typeof createFolderSchema>;
