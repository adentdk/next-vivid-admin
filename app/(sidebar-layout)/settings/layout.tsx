import PageHeader from "@/components/commons/page-header";
import { TabsContent } from "@/components/ui/tabs";

import TabWrapper from "./_lib/components/tab-wrapper";

export default function Layout(props: {
  children: React.ReactNode;
  site: React.ReactNode;
  meta: React.ReactNode;
  theme: React.ReactNode;
  email: React.ReactNode;
  socialMedia: React.ReactNode;
  maintenance: React.ReactNode;
  shield: React.ReactNode;
}) {
  return (
    <main className="space-y-8">
      <PageHeader
        title="Pengaturan Halaman"
        breadcrumbs={[
          { title: "Beranda", href: "/engine" },
          { title: "Pengaturan", href: "/setting", disabled: true },
        ]}
      />
      <TabWrapper>
        <TabsContent value="site">{props.site}</TabsContent>
        <TabsContent value="meta">{props.meta}</TabsContent>
        <TabsContent value="theme">{props.theme}</TabsContent>
        <TabsContent value="email">{props.email}</TabsContent>
        <TabsContent value="social-media">{props.socialMedia}</TabsContent>
        <TabsContent value="maintenance">{props.maintenance}</TabsContent>
        <TabsContent value="shield">{props.shield}</TabsContent>
      </TabWrapper>
    </main>
  );
}
