import PageHeader from "@/components/commons/page-header";
import { ButtonLink } from "@/components/ui/button-link";

import CreateNamespaceForm from "../_components/create-namespace-form";

export default function Page() {
  return (
    <main className="space-y-8">
      <PageHeader
        title="Create Translation Namespace"
        breadcrumbs={[
          { title: "Beranda", href: "" },
          {
            title: "List of Translation Namespaces",
            href: "/translation-manager",
          },
          {
            title: "Create Translation Namespace",
            href: "/translation-manager/create",
            disabled: true,
          },
        ]}
        actions={
          <ButtonLink variant="destructive" href="/translation-manager">
            Cancel
          </ButtonLink>
        }
      />

      <CreateNamespaceForm />
    </main>
  );
}
