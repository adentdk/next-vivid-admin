import Link from "next/link";
import { Fragment } from "react";

import {
  Folders,
  Home,
  Languages,
  LayoutGrid,
  LucideProps,
  Newspaper,
  PanelTop,
  Puzzle,
  Settings,
  Shield,
  UserCog2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { AppSidebarFooter } from "./app-sidebar-footer";
import { AppSidebarHeader } from "./app-sidebar-header";

type SidebarItem = {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

// Menu items.
const items: Record<string, SidebarItem[]> = {
  Application: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
  ],
  Posts: [
    {
      title: "Posts",
      url: "/posts",
      icon: Newspaper,
    },
    {
      title: "Categories",
      url: "/post-categories",
      icon: LayoutGrid,
    },
  ],
  Pages: [
    {
      title: "Pages",
      url: "/pages",
      icon: PanelTop,
    },
    {
      title: "Components",
      url: "/page-components",
      icon: Puzzle,
    },
  ],
  "Site Settings": [
    {
      title: "Menus",
      url: "/menus",
      icon: LayoutGrid,
    },
    {
      title: "Settings",
      url: "/setting",
      icon: Settings,
    },
  ],
  "Master Data": [
    {
      title: "Translation Manager",
      url: "/translation-manager",
      icon: Languages,
    },
  ],
  "Storage & Media": [
    {
      title: "Media Library",
      url: "/media",
      icon: Folders,
    },
  ],
  "User & Role": [
    {
      title: "Users",
      url: "/users",
      icon: UserCog2,
    },
    {
      title: "Roles",
      url: "/roles",
      icon: Shield,
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      <AppSidebarHeader />

      <SidebarContent>
        <MapMenu items={items} />
      </SidebarContent>

      <AppSidebarFooter />
    </Sidebar>
  );
}

function MapMenu({ items }: { items: Record<string, SidebarItem[]> }) {
  return (
    <Fragment>
      {Object.entries(items).map(([label, items], entryIndex) => {
        return (
          <SidebarGroup key={`group-[${label}]-${entryIndex}`}>
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => {
                  return (
                    <SidebarMenuItem key={`menu-[${item.title}]-${index}`}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        );
      })}
    </Fragment>
  );
}
