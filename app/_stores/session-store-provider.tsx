"use client";

import { createContext, useContext, useRef } from "react";

import { type StoreApi, useStore } from "zustand";

import {
  createSessionStore,
  SessionStateType,
  type SessionStoreType,
} from "./session.store";

export const SessionStoreContext =
  createContext<StoreApi<SessionStoreType> | null>(null);

export interface SessionStoreProviderProps {
  children: React.ReactNode;
  initialState?: Partial<SessionStateType>;
  refetchInterval?: number;
}

export const SessionStoreProvider = ({
  children,
  initialState,
}: SessionStoreProviderProps) => {
  const storeRef = useRef<StoreApi<SessionStoreType>>();

  if (!storeRef.current) {
    storeRef.current = createSessionStore(initialState);
  }

  // useInterval(() => {
  //   fetch("/api/session")
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       throw new Error("Failed to fetch session data");
  //     })
  //     .then((data) => {
  //       const decriptedData = Encryption.decrypt(
  //         NEXT_PUBLIC_CLIENT_APP_SECRET,
  //         data,
  //       );
  //       if (!decriptedData) {
  //         throw new Error("Failed to fetch session data");
  //       }
  //       storeRef.current?.setState(decriptedData);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, refetchInterval);

  return (
    <SessionStoreContext.Provider value={storeRef.current}>
      {children}
    </SessionStoreContext.Provider>
  );
};

export const withSessionStoreProvider = (Component: React.ComponentType) => {
  return (props: any) => (
    <SessionStoreProvider>
      <Component {...props} />
    </SessionStoreProvider>
  );
};

export const useSessionContext = () => {
  const store = useContext(SessionStoreContext);
  if (!store) {
    throw new Error(
      "useSessionContext must be used within a SessionStoreProvider",
    );
  }
  return store;
};

export const useSessionStore = <T,>(
  selector: (store: SessionStoreType) => T,
): T => {
  const store = useSessionContext();
  return useStore(store, selector);
};
