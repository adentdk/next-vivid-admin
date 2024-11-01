import type { UserInfo } from "firebase/auth";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

export type SessionStateType = {
  idToken: string | null;
  user: UserInfo | null;
};

export type SessionActionType = {
  set: (newState: Partial<SessionStateType>) => void;
};

export type SessionGetterType = {};

export type SessionStoreType = SessionStateType &
  SessionActionType &
  SessionGetterType;

export const defaultInitialState: SessionStateType = {
  idToken: null,
  user: null,
};

export const createSessionStore = (initState?: Partial<SessionStateType>) => {
  return createStore<SessionStoreType>()(
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
