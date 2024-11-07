import { cookies } from "next/headers";

import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "../_components/app-sidebar";

export default function SidebarLayout(props: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const defaultSidebarOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen}>
      <AppSidebar />
      <main className="space-y-4 w-full px-4 relative">{props.children}</main>
    </SidebarProvider>
  );
}
