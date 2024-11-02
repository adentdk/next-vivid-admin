import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button-link";
import { DataTable } from "@/components/ui/data-table";
import { PaginationParams } from "@/lib/types";

import { columns } from "./_components/datatable-columns";

type PageProps = {
  searchParams: PaginationParams & {
    parentMenuId?: string;
  };
};

export default async function Page({
  searchParams: { parentMenuId, ...searchParams },
}: PageProps) {
  const menus = await getMenuQuery({
    pagination: {
      page: searchParams?.page || 1,
      limit: searchParams?.limit || 10,
    },
    filter: {
      parentId: {
        equals: parseInt(parentMenuId ?? "0") || null,
      },
    },
    withChildrenCount: true,
  });

  const additionalBreadcrumbs = [];

  if (parentMenuId) {
    additionalBreadcrumbs.push({
      title: `Child Menu of Menu ID: ${parentMenuId}`,
      href: `/engine/menu?parentMenuId=${parentMenuId}`,
      disabled: true,
    });
  }

  return (
    <main className="space-y-8">
      <PageHeader
        title="List of Menus"
        breadcrumbs={[
          { title: "Home", href: "/engine" },
          {
            title: "List of Menus",
            href: "/engine/menu",
            disabled: typeof parentMenuId === "undefined",
          },
          ...additionalBreadcrumbs,
        ]}
        actions={
          <ButtonLink href="/engine/menu/create" variant="default">
            Add Menu
          </ButtonLink>
        }
      />

      <DataTable columns={columns} data={menus.menus} />
    </main>
  );
}
