'use client';

import { SWRConfiguration } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { getFolderItems } from '../../actions';

type UseFolderItemsType = {
  path: string;
  allowedExtensions?: string[];
  disabled?: boolean;
  options?: SWRConfiguration;
};
export const useFolderItems = ({
  path,
  allowedExtensions,
  disabled = false,
  options,
}: UseFolderItemsType) => {
  const { data, isLoading, error } = useSWRImmutable(
    !disabled ? ['use-folder-items', path, allowedExtensions] : null,
    async () => getFolderItems(path, allowedExtensions),
    options,
  );
  return { data, isLoading, error };
};
