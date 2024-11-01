'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { DefaultValues, useForm } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';

import FormLayout from '~/components/commons/form-layout';
import { AlertDialogAction } from '~/components/ui/alert-dialog';
import { Form } from '~/components/ui/form';
import SubmitButton from '~/components/ui/submit-button';
import { useAlert } from '~/components/ui/use-alert';
import { useToast } from '~/components/ui/use-toast';
import {
  updateMenuQuery,
  UpdateMenuType,
} from '~/libs/prisma/queries/update-menu.query';
import {
  MenuGroupEnum,
  MenuLinkTargetEnum,
  MenuLinkTypeEnum,
} from '~/libs/types/enum';

import {
  createMenuSchema,
  CreateMenuSchemaType,
} from '../_schemas/create-menu-schema';

import MenuAdditionalInfoInputs from './menu-additional-info-inputs';
import MenuBasicInfoInputs from './menu-basic-info-inputs';

type UpdateMenuFormType = {
  menuId: number;
  defaultValues?: DefaultValues<CreateMenuSchemaType>;
};

export default function UpdateMenuForm({
  menuId,
  defaultValues,
}: UpdateMenuFormType) {
  const formMethods = useForm({
    resolver: yupResolver(createMenuSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      href: defaultValues?.href ?? '',
      i18nNameKey: defaultValues?.i18nNameKey ?? '',
      i18nDescriptionKey: defaultValues?.i18nDescriptionKey ?? '',
      status: defaultValues?.status ?? true,
      group: defaultValues?.group ?? MenuGroupEnum.Default,
      linkType: defaultValues?.linkType ?? MenuLinkTypeEnum.Href,
      linkTarget: defaultValues?.linkTarget ?? MenuLinkTargetEnum.CurrentTab,
      icon: defaultValues?.icon ?? '',
    },
  });

  const { handleSubmit } = formMethods;

  const { alert } = useAlert();
  const { toast } = useToast();

  const router = useRouter();

  const onFormAction = useCallback(
    (formdata: FormData) => {
      return handleSubmit(
        async (values) => {
          try {
            const payload: UpdateMenuType = {
              name: values.name,
              description: values.description || null,
              group: values.group,
              sitemapPriority: values.sitemapPriority || null,
              href: values.href || null,
              hrefTarget: values.linkTarget || null,
              status: values.status,
              badge: {
                ...values.badge,
              },
              i18nNameKey: values.i18nNameKey || null,
              i18nDescriptionKey: values.i18nDescriptionKey || null,
              icon: values.icon || null,
            };

            if (values.categoryId) {
              payload.category = {
                connect: {
                  id: values.categoryId,
                },
              };
            }

            if (values.parentId) {
              payload.parent = {
                connect: {
                  id: values.parentId,
                },
              };
            }

            await updateMenuQuery(menuId, payload);

            toast({
              title: 'Menu created successfully',
              variant: 'default',
            });

            router.push('/engine/menu');
          } catch (error: any) {
            alert({
              title: 'Failed to create menu',
              description: error.message,
              variant: 'destructive',
              action: (
                <AlertDialogAction variant="destructive">
                  Close
                </AlertDialogAction>
              ),
            });
          }
        },
        (error) => {},
      )();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [menuId],
  );

  const isXlDestop = useMediaQuery('(min-width: 1280px)');

  return (
    <Form {...formMethods}>
      <form action={onFormAction} className="space-y-4">
        <FormLayout>
          <FormLayout.Main>
            <MenuBasicInfoInputs />
            {isXlDestop ? null : <MenuAdditionalInfoInputs />}
          </FormLayout.Main>
          <FormLayout.Sidebar className="xl:min-w-96">
            {isXlDestop ? <MenuAdditionalInfoInputs /> : null}
            <SubmitButton className="w-full">Save</SubmitButton>
          </FormLayout.Sidebar>
        </FormLayout>
      </form>
    </Form>
  );
}
