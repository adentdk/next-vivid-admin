import { Metadata } from "next";
import { Fragment } from "react";

import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button-link";
import { DataTable } from "@/components/ui/data-table";
import { MenuType, PaginationParams, PaginatitedResponse } from "@/lib/types";
import { FetchApiServer } from "@/lib/utils/fetch-api-server";

import { columns } from "./_components/datatable-columns";

type PageProps = {
  searchParams: PaginationParams & {
    parentMenuId?: string;
  };
};

export const metadata: Metadata = {
  title: "List of Menus",
};

export default async function Page({
  searchParams: { parentMenuId, ...searchParams },
}: PageProps) {
  const api = new FetchApiServer();
  const result = await api.fetch<PaginatitedResponse<MenuType>>({
    url: "/v1/menus/manage",
    params: {
      limit: searchParams?.limit || 10,
    },
  });

  if (!result.success) {
    return <div>Error</div>;
  }

  const additionalBreadcrumbs = [];

  if (parentMenuId) {
    additionalBreadcrumbs.push({
      title: `Child Menu of Menu ID: ${parentMenuId}`,
      href: `/menus?parentMenuId=${parentMenuId}`,
      disabled: true,
    });
  }

  return (
    <Fragment>
      <PageHeader
        title="List of Menus"
        breadcrumbs={[
          { title: "Home", href: "" },
          {
            title: "List of Menus",
            href: "/menus",
            disabled: typeof parentMenuId === "undefined",
          },
          ...additionalBreadcrumbs,
        ]}
        actions={
          <ButtonLink href="/menus/create" variant="default">
            Add Menu
          </ButtonLink>
        }
      />

      <DataTable columns={columns} data={result.data.items} />
    </Fragment>
  );
}
