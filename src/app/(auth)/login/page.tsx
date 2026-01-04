import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login",
};

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl: string | null }>;
}

const page = async ({ searchParams }: LoginPageProps) => {
  const callbackUrl = (await searchParams).callbackUrl;
  return <LoginForm callbackUrl={callbackUrl} />;
};

export default page;
