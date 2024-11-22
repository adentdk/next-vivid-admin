import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

import type { PostManageType } from "@/lib/types";

export type ThisStateType = {
  post: PostManageType | null;
};

export type ThisActionType = {
  set: (newState: Partial<ThisStateType>) => void;
};

export type ThisGetterType = {};

export type ThisStoreType = ThisStateType & ThisActionType & ThisGetterType;

export const defaultInitialState: ThisStateType = {
  post: null,
};

export const createThisStore = (initState?: Partial<ThisStateType>) => {
  return createStore<ThisStoreType>()(
    immer((set, get) => ({
      ...defaultInitialState,
      ...initState,
      // getters
      //
      // setters
      set: (newState) => set(newState),
    })),
  );
};
