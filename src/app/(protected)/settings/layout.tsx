import { type PropsWithChildren } from "react";

import { AccountSidebar } from "@/components/partials/sidebar/account-sidebar";
import { PageHeader } from "@/components/shared/page-header";

const layout = async (props: PropsWithChildren) => {
  return (
    <div>
      <PageHeader title="Account" description="Manage your account, security" />
      <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-[256px_1fr]">
        <AccountSidebar />
        <div className="min-w-0">{props.children}</div>
      </div>
    </div>
  );
};

export default layout;
