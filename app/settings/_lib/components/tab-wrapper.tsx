"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabWrapper(props: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/engine/setting") {
      router.replace("/engine/setting/site");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Tabs
      defaultValue="site"
      value={pathname.split("/").pop()}
      onValueChange={(v) => {
        router.push(`/engine/setting/${v}`);
      }}
    >
      <TabsList>
        <TabsTrigger value="site">Halaman</TabsTrigger>
        <TabsTrigger value="meta">Meta</TabsTrigger>
        <TabsTrigger value="theme">Tema</TabsTrigger>
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="social-media">Media Sosial</TabsTrigger>
        <TabsTrigger value="maintenance">Pemeliharaan</TabsTrigger>
        <TabsTrigger value="shield">Perisai</TabsTrigger>
      </TabsList>

      {props.children}
    </Tabs>
  );
}
