"use client";

import { usePathname } from "next/navigation";

import { SidebarNavItem } from "@/components/partials/sidebar/nav-item";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils/classname";
import { hasActiveChild, matchesRoute } from "@/lib/utils/routes";

import type { SidebarItem } from "@/types";

interface SidebarMenuGroupProps {
  items: SidebarItem[];
  label: string;
  action?: React.ReactNode;
  groupLabelClassName?: string;
}

interface SidebarMenuListProps {
  items: SidebarItem[];
}

export function SidebarMenuList({ items }: SidebarMenuListProps) {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map(item => {
        const itemActive = matchesRoute(pathname, item.url, {
          strategy: item.matchStrategy,
          pattern: item.matchPattern,
          customMatcher: item.customMatcher,
        });

        const childActive = hasActiveChild(pathname, item.items);

        const isActive = itemActive || childActive;

        return (
          <SidebarNavItem key={item.title} item={item} isActive={isActive} />
        );
      })}
    </SidebarMenu>
  );
}

export function SidebarNavMenuGroup({
  label,
  items,
  action,
  groupLabelClassName,
}: SidebarMenuGroupProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className={cn(groupLabelClassName)}>
        {label}
        {action}
      </SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuList items={items} />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
