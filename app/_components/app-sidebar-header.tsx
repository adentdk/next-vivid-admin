import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebarHeader() {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <h1 className="text-2xl font-bold text-primary text-center my-2">
            NextVivid
          </h1>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
