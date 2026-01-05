import type { PropsWithChildren } from "react";

import { DashboardHeader } from "@/components/partials/header/dashboard-header";
import { DashboardSidebar } from "@/components/partials/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const style = {
  "--sidebar-width": "calc(var(--spacing) * 72)",
  "--header-height": "calc(var(--spacing) * 14)",
};

const layout = async ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <DashboardSidebar variant="inset" />
      <SidebarInset className="flex h-[calc(100vh-16px)] flex-col overflow-hidden dark:md:peer-data-[variant=inset]:border">
        <DashboardHeader />
        <div className="dashboard-scrollable flex-1 overflow-x-hidden overflow-y-auto">
          <div className="flex flex-col gap-4 px-4 py-4 lg:gap-6 lg:px-6 lg:py-6">
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                {children}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default layout;
