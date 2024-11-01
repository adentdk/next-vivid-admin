"use client";

import { useRouter } from "next/navigation";

import { ChevronLeft } from "lucide-react";

import { Breadcrumb, BreadcrumbItemType } from "@/components/ui/breadcrumb";

import { Button } from "./ui/button";

export function PageHeader(props: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: BreadcrumbItemType[];
  canGoBack?: boolean;
}) {
  const { title, description, actions, breadcrumbs, canGoBack = false } = props;

  const router = useRouter();

  return (
    <header className="space-y-4">
      {typeof breadcrumbs !== "undefined" ? (
        <Breadcrumb
          className="flex justify-center sm:justify-start"
          items={breadcrumbs ?? []}
        />
      ) : null}
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        {canGoBack ? (
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
        ) : null}
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-medium text-foreground">
            {title}
          </h1>
          {typeof description !== "undefined" ? (
            <p className="text-foreground">{description}</p>
          ) : null}
        </div>

        <div className="flex flex-grow"></div>

        {typeof actions !== "undefined" ? (
          <div className="flex justify-end gap-4 flex-wrap">{actions}</div>
        ) : null}
      </div>
    </header>
  );
}