import type { AxiosError } from "axios";

import { EmailVerificationStatusCard } from "@/features/auth/components/email-verification-card";

import { authService } from "@/services/auth";

import { APP_ROUTES } from "@/constants/app-routes";

import type { ApiResponse } from "@/types/api/shared";

interface VerifyEmailPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

type VerificationResult =
  | { status: "invalid" }
  | { status: "success" }
  | { status: "error"; errorMessage: string };

async function verifyEmailToken(token: string): Promise<VerificationResult> {
  try {
    await authService.verifyEmail(token);
    return { status: "success" };
  } catch (error) {
    const errorMessage =
      (error as AxiosError<ApiResponse>).response?.data.message ??
      "Failed to verify email. Please try again.";
    return { status: "error", errorMessage };
  }
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const token = (await searchParams).token;

  const result: VerificationResult = !token
    ? { status: "invalid" }
    : await verifyEmailToken(token);

  if (result.status === "success") {
    return (
      <EmailVerificationStatusCard
        status="success"
        redirectUrl={APP_ROUTES.AUTH.LOGIN}
      />
    );
  }

  if (result.status === "error") {
    return (
      <EmailVerificationStatusCard
        status="error"
        errorMessage={result.errorMessage}
        redirectUrl={APP_ROUTES.AUTH.LOGIN}
      />
    );
  }

  return (
    <EmailVerificationStatusCard
      status="invalid"
      redirectUrl={APP_ROUTES.AUTH.LOGIN}
    />
  );
}
