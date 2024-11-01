import { array, InferType, object, string } from 'yup';

const keyValueSchema = object().shape({
  key: string().required('Key is required'),
  value: string().required('Value is required'),
});

const localeSchema = object().shape({
  locale: string().required('Locale is required'),
  keyValues: array().of(keyValueSchema).required('Key values are required'),
});

export const createNamespaceSchema = object().shape({
  namespace: string().required('Namespace is required'),
  locales: array().of(localeSchema).required('Locales are required'),
});

export type CreateNamespaceSchema = InferType<typeof createNamespaceSchema>;
