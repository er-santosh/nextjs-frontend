import { Suspense } from "react";

import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/components/login-form";

import PageLoader from "@/components/shared/page-loader";

export const metadata: Metadata = {
  title: "Login",
};

const page = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <LoginForm />
    </Suspense>
  );
};

export default page;
