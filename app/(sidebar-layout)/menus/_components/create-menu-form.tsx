"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";

import FormLayout from "@/components/form-layout";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/ui/submit-button";
import {
  MenuGroupEnum,
  MenuLinkTargetEnum,
  MenuLinkTypeEnum,
} from "@/lib/types";

import { createMenuSchema } from "../_schemas/create-menu-schema";
import { createMenuAction } from "../actions";

import MenuAdditionalInfoInputs from "./menu-additional-info-inputs";
import MenuBasicInfoInputs from "./menu-basic-info-inputs";

export default function CreateMenuForm() {
  const formMethods = useForm({
    resolver: yupResolver(createMenuSchema),
    defaultValues: {
      name: "",
      description: "",
      href: "",
      i18nNameKey: "",
      i18nDescriptionKey: "",
      status: true,
      group: MenuGroupEnum.Default,
      linkType: MenuLinkTypeEnum.Href,
      linkTarget: MenuLinkTargetEnum.CurrentTab,
      sitemapPriority: 1,
      icon: "",
    },
  });

  const { handleSubmit } = formMethods;

  const router = useRouter();

  const onFormAction = useCallback((formdata: FormData) => {
    return handleSubmit(
      async (values) => {
        try {
          const payload: CreateMenuType = {
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

          await createMenuAction(payload);

          toast({
            title: "Menu created successfully",
            variant: "default",
          });

          router.push("/menus");
        } catch (error: any) {
          alert({
            title: "Failed to create menu",
            description: error.message,
            variant: "destructive",
            action: (
              <AlertDialogAction variant="destructive">Close</AlertDialogAction>
            ),
          });
        }
      },
      (error) => {
        console.error(error);
      },
    )();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isXlDestop = useMediaQuery("(min-width: 1280px)", {
    defaultValue: false,
  });

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
