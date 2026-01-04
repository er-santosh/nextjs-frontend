import type { LucideIcon } from "lucide-react";

export type ChoiceOption = {
  value: string;
  label: string;
};

export type NavItem = {
  title: string;
  icon?: LucideIcon;
  url: string;
};

export type RouteMatchStrategy = "exact" | "prefix" | "pattern" | "custom";

export type SidebarItem = NavItem & {
  items?: NavItem[];
  matchStrategy?: RouteMatchStrategy;
  matchPattern?: RegExp;
  customMatcher?: (currentPath: string, itemUrl: string) => boolean;
};
