'use client';

import { useCallback, useRef } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
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
import { useToast } from '~/components/ui/use-toast';

import { uploadFileSchema } from '../_schemas/upload-file-schema';
import { saveFile } from '../actions';

import { useFileManagerStore } from './store-provider';

export function ModalUploadFile() {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { toast } = useToast();

  const formMethods = useForm({
    resolver: yupResolver(uploadFileSchema),
  });

  const { handleSubmit, reset } = formMethods;

  const currentPath = useFileManagerStore((s) => s.currentPath);

  const handleFormAction = useCallback(
    (formdata: FormData) => {
      return handleSubmit(async (data) => {
        try {
          const _formData = new FormData();
          _formData.append('file', data.file.blob);
          await saveFile(currentPath, _formData);

          reset();

          closeButtonRef.current?.click();

          toast({
            title: 'Berhasil',
            description: `File berhasil diunggah ke folder ${currentPath}`,
          });
        } catch (error) {
          toast({
            title: 'Gagal',
            description: 'Terjadi kesalahan saat mengunggah file',
            variant: 'destructive',
          });
        }
      })();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPath],
  );

  return (
    <Dialog>
      <DialogClose asChild>
        <button type="button" className="hidden" ref={closeButtonRef}></button>
      </DialogClose>
      <DialogTrigger asChild>
        <Button type="button">Unggah file</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleFormAction}>
          <Form {...formMethods}>
            <DialogHeader>
              <DialogTitle>Unggah file</DialogTitle>
            </DialogHeader>
            <div className="my-8">
              <FormField
                name="file"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem className="col-span-3">
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Masukkan nama folder"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files?.length) {
                            onChange({
                              value: e.target.value,
                              blob: e.target.files[0],
                            });
                          } else {
                            onChange(undefined);
                          }
                        }}
                        value={value?.value ?? ''}
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
