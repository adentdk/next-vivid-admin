import { PageHeader } from "@/components/page-header";
import { ButtonLink } from "@/components/ui/button-link";
import { DataTable } from "@/components/ui/data-table";
import { PaginationParams } from "@/lib/types";

import { columns } from "./_components/datatable-columns";

export default async function TranslationManagerPage(props: {
  searchParams?: PaginationParams;
}) {
  const result = await getI18nNamespacesQuery({
    pagination: {
      page: props.searchParams?.page || 1,
      limit: props.searchParams?.limit || 10,
    },
  });
  return (
    <main className="space-y-8">
      <PageHeader
        title="List of Translation Namespaces"
        breadcrumbs={[
          { title: "Beranda", href: "/engine" },
          {
            title: "List of Translation Namespaces",
            href: "/translation-manager",
            disabled: true,
          },
        ]}
        actions={
          <ButtonLink variant="default" href="/translation-manager/create">
            Add Translation Namespace
          </ButtonLink>
        }
      />

      <DataTable columns={columns} data={result.namespaces} />
    </main>
  );
}
