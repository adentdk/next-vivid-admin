import { createStore } from 'zustand/vanilla';

export type FileManagerStateType = {
  currentPath: string;
};

export type FileManagerActionType = {
  set: (newState: Partial<FileManagerStateType>) => void;
};

export type FileManagerGetterType = {};

export type FileManagerStoreType = FileManagerStateType &
  FileManagerActionType &
  FileManagerGetterType;

export const defaultInitialState: FileManagerStateType = {
  currentPath: '/',
};

export const createFileManagerStore = (
  initState: FileManagerStateType = defaultInitialState,
) => {
  return createStore<FileManagerStoreType>((set, get) => ({
    ...initState,
    set: (newState) => set(newState),
  }));
};
