import { Metadata } from "next";
import { Fragment } from "react";

import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button-link";
import { DataTable } from "@/components/ui/data-table";
import {
  PaginationParams,
  PaginatitedResponse,
  PostCategoryType,
} from "@/lib/types";
import { FetchApiServer } from "@/lib/utils/fetch-api-server";

import { columns } from "./_components/datatable-columns";

type PageProps = {
  searchParams: PaginationParams & {
    parentCategoryId?: string;
  };
};

export const metadata: Metadata = {
  title: "List of Post Category",
};

export default async function Page({
  searchParams: { parentCategoryId, ...searchParams },
}: PageProps) {
  const api = new FetchApiServer();
  const result = await api.fetch<PaginatitedResponse<PostCategoryType>>({
    url: "/v1/post-categories/manage",
    params: {
      limit: searchParams?.limit || 10,
    },
  });

  if (!result.success) {
    return <div>Error</div>;
  }

  const additionalBreadcrumbs = [];

  if (parentCategoryId) {
    additionalBreadcrumbs.push({
      title: `Child Menu of Menu ID: ${parentCategoryId}`,
      href: `/post-categories?parentCategoryId=${parentCategoryId}`,
      disabled: true,
    });
  }

  return (
    <Fragment>
      <PageHeader
        title="List of Post Categories"
        breadcrumbs={[
          { title: "Home", href: "" },
          {
            title: "Posts",
            href: "/posts",
          },
          {
            title: "Categories",
            href: "/post-categories",
            disabled: true,
          },
        ]}
        actions={
          <ButtonLink href="/post-categories/create" variant="default">
            Add new category
          </ButtonLink>
        }
      />

      <DataTable columns={columns} data={result.data.items} />
    </Fragment>
  );
}
