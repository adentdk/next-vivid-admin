'use client';

import { useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { supportedLngs } from '~/app/i18n/settings';
import FormLayout from '~/components/commons/form-layout';
import { Form } from '~/components/ui/form';
import SubmitButton from '~/components/ui/submit-button';

import { createNamespaceSchema } from '../_schemas/create-namespace-schema';

export default function CreateNamespaceForm() {
  const formMethods = useForm({
    resolver: yupResolver(createNamespaceSchema),
    defaultValues: {
      namespace: '',
      locales: supportedLngs.map((locale) => ({
        locale,
        keyValues: [{ key: '', value: '' }],
      })),
    },
  });

  const { handleSubmit } = formMethods;

  const onFormAction = useCallback(
    (formdata: FormData) => {
      return handleSubmit(async (values) => {})();
    },
    [handleSubmit],
  );

  return (
    <Form {...formMethods}>
      <form action={onFormAction} className="space-y-4">
        <FormLayout>
          <FormLayout.Main>
            <div></div>
          </FormLayout.Main>
          <FormLayout.Sidebar className="xl:min-w-64">
            <SubmitButton className="w-full">Save</SubmitButton>
          </FormLayout.Sidebar>
        </FormLayout>
      </form>
    </Form>
  );
}
