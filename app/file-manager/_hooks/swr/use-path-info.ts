'use client';

import { SWRConfiguration } from 'swr';
import useSWRImmutable from 'swr/immutable';

import { getPathInfo } from '../../actions';

type UsePathInfoType = {
  path: string;
  disabled?: boolean;
  options?: SWRConfiguration;
};
export const usePathInfo = ({
  path,
  disabled = false,
  options,
}: UsePathInfoType) => {
  const { data, isLoading, error } = useSWRImmutable(
    !disabled ? ['use-path-info', path] : null,
    async () => getPathInfo(path),
    options,
  );
  return { data, isLoading, error };
};
