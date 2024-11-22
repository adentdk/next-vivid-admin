"use client";

import { Fragment, useLayoutEffect } from "react";

import { useSessionContext } from "@/app/_stores/session-store-provider";
import { onIdTokenChanged } from "@/lib/firebase/auth";
import { FetchApi } from "@/lib/utils/fetch-api";

export function FirebaseAuthListener() {
  const setSessionState = useSessionContext().getState().set;

  useLayoutEffect(() => {
    const unsubscribe = onIdTokenChanged(async (user) => {
      if (user) {
        setSessionState({ user: user.toJSON() as any });

        const api = new FetchApi();

        await api.fetch({
          method: "POST",
          url: "/api/session",
          body: { idToken: user.accessToken },
        });
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Fragment></Fragment>;
}
