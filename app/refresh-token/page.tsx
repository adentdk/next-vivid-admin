"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Loader2 } from "lucide-react";

import { getIdToken } from "@/lib/firebase/auth";

import { createSessionAction } from "../@auth/login/actions";

type PageProps = {
  searchParams: {
    redirectTarget: string;
  };
};

export default function Page({ searchParams }: PageProps) {
  const router = useRouter();
  useEffect(() => {
    const bootstrap = async () => {
      getIdToken()
        .then((idToken) => {
          return createSessionAction(idToken);
        })
        .then(() => {
          router.replace(searchParams.redirectTarget || "/");
        })
        .catch((ee) => {
          // router.push("/logout");
        });
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.redirectTarget]);
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="size-12 animate-spin" />
    </div>
  );
}
