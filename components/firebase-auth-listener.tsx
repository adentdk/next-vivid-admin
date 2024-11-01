"use client";

import { Fragment, useLayoutEffect } from "react";

import { onAuthStateChanged } from "@/lib/firebase/auth";
import { FetchApi } from "@/lib/utils/fetch-api";

export function FirebaseAuthListener() {
  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        const api = new FetchApi();

        api.fetch({
          method: "POST",
          url: "/api/auth",
          body: user?.toJSON(),
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return <Fragment></Fragment>;
}
