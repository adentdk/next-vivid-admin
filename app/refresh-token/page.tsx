"use client";

import { Fragment, useEffect } from "react";

import { alert } from "@/components/hooks/use-alert";
import { getIdToken } from "@/lib/firebase/auth";

export default function Page() {
  useEffect(() => {
    const bootstrap = async () => {
      let isError = false;
      try {
        await getIdToken();
      } catch (error) {
        isError = true;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isError) {
        window.location.href = "/logout";
      } else {
        window.location.reload();
      }
    };

    alert.loading({
      title: "Refreshing session",
      description: "Please wait",
    });

    bootstrap();
  }, []);
  return <Fragment></Fragment>;
}
