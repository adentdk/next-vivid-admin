import { PageHeader } from "@/components/page-header";

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
