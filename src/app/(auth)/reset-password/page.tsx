import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token: string | null;
  }>;
}

const page = async ({ searchParams }: ResetPasswordPageProps) => {
  const token = (await searchParams).token;
  return <ResetPasswordForm token={token} />;
};

export default page;
