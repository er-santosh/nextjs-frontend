import type { PropsWithChildren } from "react";

import Logo from "@/components/shared/logo";
import { SoloThemeSwitcher } from "@/components/shared/theme-switcher";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-muted relative flex min-h-svh flex-col items-center justify-center gap-6 p-4 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex justify-center">
          <Logo showText={false} />
        </div>
        {children}
      </div>
      <div className="absolute right-10 bottom-10">
        <SoloThemeSwitcher />
      </div>
    </div>
  );
}
