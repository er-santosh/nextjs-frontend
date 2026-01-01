import type { PropsWithChildren } from "react";

import { SpeedInsights } from "@vercel/speed-insights/next";

export const VercelProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <SpeedInsights />
    </>
  );
};
