import PageHeader from '~/components/commons/page-header';
import { Button } from '~/components/ui/button';
import { ButtonLink } from '~/components/ui/button-link';
import { DataTable } from '~/components/ui/data-table';
import { getI18nNamespacesQuery } from '~/libs/prisma/queries/get-i18n-namespaces.query';
import { PaginationParams } from '~/libs/types/utils';

import { columns } from './_components/datatable-columns';

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
          { title: 'Beranda', href: '/engine' },
          {
            title: 'List of Translation Namespaces',
            href: '/engine/translation-manager',
            disabled: true,
          },
        ]}
        actions={
          <ButtonLink
            variant="default"
            href="/engine/translation-manager/create"
          >
            Add Translation Namespace
          </ButtonLink>
        }
      />

      <DataTable columns={columns} data={result.namespaces} />
    </main>
  );
}
