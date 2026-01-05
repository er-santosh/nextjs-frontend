"use client";

import * as React from "react";

import { Home, Settings } from "lucide-react";

import { SidebarNavMenuGroup } from "@/components/partials/sidebar/nav-menu-group";
import SearchInput from "@/components/partials/sidebar/search-input";
import Logo from "@/components/shared/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { APP_ROUTES } from "@/constants/app-routes";

import type { SidebarItem } from "@/types";

const items: SidebarItem[] = [
  {
    title: "Dashboard",
    url: APP_ROUTES.PROTECTED.DASHBOARD,
    icon: Home,
    matchStrategy: "exact",
  },
  {
    title: "Settings",
    url: APP_ROUTES.PROTECTED.SETTINGS.ACCOUNT.ROOT,
    icon: Settings,
  },
];

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex-row items-center space-x-3 transition-all duration-200 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:space-x-0">
        <Logo href={APP_ROUTES.PROTECTED.DASHBOARD} />
      </SidebarHeader>
      <SidebarContent>
        <SearchInput />
        <SidebarNavMenuGroup label="Platform" items={items} />
      </SidebarContent>
    </Sidebar>
  );
}
