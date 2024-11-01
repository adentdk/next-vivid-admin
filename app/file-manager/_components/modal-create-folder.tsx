'use client';

import { useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import SubmitButton from '~/components/ui/submit-button';

import { createFolderSchema } from '../_schemas/create-folder-schema';
import { createFolder } from '../actions';

import { useFileManagerStore } from './store-provider';

export function ModalCreateFolder() {
  const formMethods = useForm({
    resolver: yupResolver(createFolderSchema),
  });

  const { handleSubmit } = formMethods;

  const currentPath = useFileManagerStore((s) => s.currentPath);

  const handleFormAction = useCallback(
    (formdata: FormData) => {
      return handleSubmit(async (data) => {
        await createFolder(`${currentPath}/${data.name}`);
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPath],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Buat folder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleFormAction}>
          <Form {...formMethods}>
            <DialogHeader>
              <DialogTitle>Buat Folder</DialogTitle>
            </DialogHeader>
            <div className="my-8">
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>Nama Folder</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Masukkan nama folder"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <SubmitButton>Kirim</SubmitButton>
            </DialogFooter>
          </Form>
        </form>
      </DialogContent>
    </Dialog>
  );
}
