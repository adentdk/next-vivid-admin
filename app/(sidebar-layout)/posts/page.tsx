import { Fragment } from "react";

import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button-link";
import { DataTable } from "@/components/ui/data-table";
import {
  PaginationParams,
  PaginatitedResponse,
  PostManageType,
} from "@/lib/types";
import { FetchApiServer } from "@/lib/utils/fetch-api-server";

import { columns } from "./_components/datatable-columns";

type PageProps = {
  searchParams: PaginationParams;
};

export default async function Page({ searchParams }: PageProps) {
  const api = new FetchApiServer();
  const result = await api.fetch<PaginatitedResponse<PostManageType>>({
    url: "/v1/posts/manage",
    params: {
      limit: searchParams?.limit || 10,
    },
    next: {
      tags: ["posts/manage"],
    },
  });

  if (!result.success) {
    return <div>Error</div>;
  }

  return (
    <Fragment>
      <PageHeader
        title="List of Posts"
        breadcrumbs={[
          { title: "Home", href: "" },
          {
            title: "Posts",
            href: "/posts",
          },
        ]}
        actions={
          <ButtonLink href="/posts/create" variant="default">
            Add new post
          </ButtonLink>
        }
      />

      <DataTable columns={columns} data={result.data.items} />
    </Fragment>
  );
}
