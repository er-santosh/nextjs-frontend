import { Bell } from "lucide-react";

import { BreadcrumbSegments } from "@/components/partials/header/breadcrumb-segments";
import UserMenu from "@/components/partials/header/user-menu";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DashboardHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="-ml-1" />
          </TooltipTrigger>
          <TooltipContent>Toggle Sidebar</TooltipContent>
        </Tooltip>
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <BreadcrumbSegments />
        <div className="ml-auto flex items-center space-x-3">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            className="bg-accent relative rounded-full p-2"
          >
            <Bell className="animate-wiggle" />
            <Badge
              className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full px-1 font-mono tabular-nums"
              variant="destructive"
            >
              0
            </Badge>
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
