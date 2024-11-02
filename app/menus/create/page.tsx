import { PageHeader } from "@/components/page-header";

import CreateMenuForm from "../_components/create-menu-form";

export default function Page() {
  return (
    <main className="space-y-8">
      <PageHeader
        title="Create a new Menu"
        canGoBack
        breadcrumbs={[
          { title: "Home", href: "/engine" },
          { title: "List of Menus", href: "/engine/menu" },
          {
            title: "Create a new Menu",
            href: "/engine/menus/create",
            disabled: true,
          },
        ]}
      />

      <CreateMenuForm />
    </main>
  );
}
