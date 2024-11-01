'use client';

import { createContext, useContext, useRef } from 'react';

import { type StoreApi, useStore } from 'zustand';

import { createFileManagerStore, type FileManagerStoreType } from '../store';

export const FileManagerStoreContext =
  createContext<StoreApi<FileManagerStoreType> | null>(null);

export interface FileManagerStoreProviderProps {
  children: React.ReactNode;
  initialState?: FileManagerStoreType;
}

export const FileManagerStoreProvider = ({
  children,
  initialState,
}: FileManagerStoreProviderProps) => {
  const storeRef = useRef<StoreApi<FileManagerStoreType>>();

  if (!storeRef.current) {
    storeRef.current = createFileManagerStore(initialState);
  }

  return (
    <FileManagerStoreContext.Provider value={storeRef.current}>
      {children}
    </FileManagerStoreContext.Provider>
  );
};

export const withFileManagerStoreProvider = (
  Component: React.ComponentType,
) => {
  return (props: any) => (
    <FileManagerStoreProvider>
      <Component {...props} />
    </FileManagerStoreProvider>
  );
};

export const useFileManagerStore = <T,>(
  selector: (store: FileManagerStoreType) => T,
): T => {
  const store = useContext(FileManagerStoreContext);
  if (!store) {
    throw new Error(
      'useFileManagerStore must be used within a FileManagerStoreProvider',
    );
  }
  return useStore(store, selector);
};
