"use client";

import { createContext, useContext, useRef } from "react";

import { type StoreApi, useStore } from "zustand";

import { createThisStore, ThisStateType, type ThisStoreType } from "./store";

export const ThisStoreContext = createContext<StoreApi<ThisStoreType> | null>(
  null,
);

export interface ThisStoreProviderProps {
  children: React.ReactNode;
  initialState?: Partial<ThisStateType>;
  refetchInterval?: number;
}

export const ThisStoreProvider = ({
  children,
  initialState,
}: ThisStoreProviderProps) => {
  const storeRef = useRef<StoreApi<ThisStoreType>>();

  if (!storeRef.current) {
    storeRef.current = createThisStore(initialState);
  }

  return (
    <ThisStoreContext.Provider value={storeRef.current}>
      {children}
    </ThisStoreContext.Provider>
  );
};

export const withThisStoreProvider = (Component: React.ComponentType) => {
  return (props: any) => (
    <ThisStoreProvider>
      <Component {...props} />
    </ThisStoreProvider>
  );
};

export const useThisContext = () => {
  const store = useContext(ThisStoreContext);
  if (!store) {
    throw new Error("useThisContext must be used within a ThisStoreProvider");
  }
  return store;
};

export const useThisStore = <T,>(selector: (store: ThisStoreType) => T): T => {
  const store = useThisContext();
  return useStore(store, selector);
};
