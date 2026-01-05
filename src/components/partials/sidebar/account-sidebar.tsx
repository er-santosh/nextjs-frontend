"use client";

import { Lock, User } from "lucide-react";

import { SidebarNavMenuGroup } from "@/components/partials/sidebar/nav-menu-group";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { APP_ROUTES } from "@/constants/app-routes";

import type { SidebarItem } from "@/types";

interface MenuItem {
  label: string;
  items: SidebarItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "Account",
    items: [
      {
        title: "Profile",
        url: APP_ROUTES.PROTECTED.SETTINGS.ACCOUNT.ROOT,
        icon: User,
        matchStrategy: "exact",
      },
      {
        title: "Security",
        url: APP_ROUTES.PROTECTED.SETTINGS.ACCOUNT.SECURITY,
        icon: Lock,
        matchStrategy: "exact",
      },
    ],
  },
];

export const AccountSidebar = () => (
  <Sidebar collapsible="none" className="dark:bg-card h-fit w-full rounded-lg">
    <SidebarContent>
      {menuItems.map(menuItem => (
        <SidebarNavMenuGroup
          key={menuItem.label}
          label={menuItem.label}
          items={menuItem.items}
        />
      ))}
    </SidebarContent>
  </Sidebar>
);
