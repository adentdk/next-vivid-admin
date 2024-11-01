"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { usePathInfo } from "../_hooks/swr/use-path-info";
import { renameItemSchema } from "../_schemas/rename-item-schema";
import { removeFile, removeFolder } from "../actions";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import SubmitButton from "~/components/ui/submit-button";
import useQueryParams from "~/libs/hooks/use-query-params";

export default function ModalDelete() {
  const [queryParams] = useQueryParams();

  const modalOpen = useMemo(
    () => queryParams.action === "rename",
    [queryParams.action],
  );

  const path = useMemo(() => queryParams.path, [queryParams.path]);

  const router = useRouter();

  const { data: pathInfo, isLoading: pathInfoLoading } = usePathInfo({
    path,
    disabled: !modalOpen || !path,
  });

  const formMethods = useForm({
    resolver: yupResolver(renameItemSchema),
  });

  const { setValue, handleSubmit } = formMethods;

  const handleFormAction = useCallback(
    (formdata: FormData) => {
      return handleSubmit(async (data) => {
        if (!pathInfo) return;
        const submit = formdata.get("submit");

        try {
          if (submit !== "delete") return;

          if (pathInfo.isFolder) {
            await removeFolder(pathInfo.path);
          } else {
            await removeFile(pathInfo.path);
          }
        } catch (error) {
          console.error(error);
        } finally {
          console.log("finally");
          router.back();
        }
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathInfo],
  );

  useEffect(() => {
    if (modalOpen) {
      setValue("newName", "");
      if (pathInfo?.name) {
        setValue("realName", pathInfo.name);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen, pathInfo]);

  return (
    <Dialog
      open={modalOpen}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        {pathInfoLoading ? <p>Loading...</p> : null}
        <form action={handleFormAction} className="space-y-8">
          <DialogHeader>
            <DialogTitle>Ubah nama, {pathInfo?.name}</DialogTitle>
          </DialogHeader>

          <Form {...formMethods}>
            <FormField
              name="newName"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="off"
                      placeholder="Masukkan nama baru"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>

          <DialogFooter className="gap-2">
            <SubmitButton name="submit" variant="ghost" value="cancel">
              Cancel
            </SubmitButton>
            <SubmitButton name="submit" variant="default" value="delete">
              Ubah nama
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
