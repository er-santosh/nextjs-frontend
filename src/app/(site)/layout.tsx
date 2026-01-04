import type { PropsWithChildren } from "react";

import Footer from "@/components/partials/footer";
import Header from "@/components/partials/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const style = {
  "--sidebar-width": "calc(var(--spacing) * 72)",
  "--header-height": "calc(var(--spacing) * 14)",
};

const layout = async ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <SidebarInset className="flex h-screen flex-col overflow-hidden">
        <div className="bg-background h-full">
          <Header />
          <main className="h-full overflow-y-auto pt-16">{children}</main>
          <Footer />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default layout;
