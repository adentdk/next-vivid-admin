'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import PageHeader from '~/components/commons/page-header';

import { ModalCreateFolder } from './modal-create-folder';
import { ModalUploadFile } from './modal-upload-file';
import { useFileManagerStore } from './store-provider';

export default function FileManagerHeader() {
  const params = useParams() as { paths?: string[] };

  const [setFileManagerState] = useFileManagerStore((state) => [state.set]);

  useEffect(() => {
    setFileManagerState({
      currentPath: params?.paths?.join('/') ?? '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.paths]);

  return (
    <PageHeader
      title="Manajer file"
      breadcrumbs={[
        { title: 'Beranda', href: '/engine' },
        { title: 'Manajer file', href: '/engine/file-manager' },
        ...(params?.paths?.map((path, index, arr) => ({
          disabled: index === arr.length - 1,
          title: path,
          href: [
            `/engine/file-manager`,
            path
              .split('/')
              .slice(0, index + 1)
              .join('/'),
          ].join('/'),
        })) ?? []),
      ]}
      actions={
        <>
          <ModalCreateFolder />
          <ModalUploadFile />
        </>
      }
    />
  );
}
