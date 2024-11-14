"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Loader2 } from "lucide-react";

type RedirectRouterProps = {
  to: string;
  replace?: boolean;
};

export function RedirectRouter({ to, replace = false }: RedirectRouterProps) {
  const router = useRouter();

  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 bg-background bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-background p-4 rounded-lg shadow-lg flex gap-4 items-center">
        <Loader2 className="size-8 animate-spin" />
        <p>Redirecting</p>
      </div>
    </div>
  );
}
