import type { Metadata } from "next";

import ChangePasswordForm from "@/features/account/components/change-password-form";

export const metadata: Metadata = {
  title: "Security Settings",
  robots: { index: false, follow: false },
};

const page = () => {
  return <ChangePasswordForm />;
};

export default page;
