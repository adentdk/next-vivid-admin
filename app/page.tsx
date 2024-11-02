import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <main>
      <PageHeader
        title="Dashboard"
        breadcrumbs={[{ title: "Dashboard", href: "/", disabled: true }]}
      />
    </main>
  );
}
