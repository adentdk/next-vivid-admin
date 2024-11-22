import { Fragment } from "react";

import { fetcher } from "@/app/api-fetcher";
import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button-link";
import { DataTable } from "@/components/ui/data-table";
import {
  LocaleEnum,
  PaginationParams,
  PaginatedResponse,
  PostManageType,
} from "@/lib/types";

import { columns } from "./_components/datatable-columns";
import { LocaleFilter } from "./_components/locale-filter";

type PageProps = {
  searchParams: PaginationParams & {
    locale: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const result = await fetcher<PaginatedResponse<PostManageType>>(
    "/v1/posts/manage",
    {
      params: {
        limit: searchParams?.limit || 10,
        locale: searchParams?.locale ?? LocaleEnum.ID,
      },
    },
  );

  if (!result.success) {
    return <div>Error</div>;
  }

  return (
    <Fragment>
      <PageHeader
        title="List of Posts"
        breadcrumbs={[
          { title: "Home", href: "/" },
          {
            title: "Posts",
            href: "/posts",
          },
        ]}
        actions={
          <ButtonLink href="/posts/init" variant="default">
            Add new post
          </ButtonLink>
        }
      />

      <div>
        <DataTable
          actions={
            <Fragment>
              <LocaleFilter />
              <div className="flex flex-1"></div>
            </Fragment>
          }
          columns={columns}
          data={result.data.items}
        />
      </div>
    </Fragment>
  );
}
