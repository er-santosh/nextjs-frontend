import Link from "next/link";

import { XCircle, CheckCircle2, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type VerificationStatus = "success" | "error" | "invalid";

interface VerificationStatusCardProps {
  status: VerificationStatus;
  errorMessage?: string;
  redirectUrl: string;
  redirectLabel?: string;
}

const STATUS_CONFIG: Record<
  VerificationStatus,
  {
    icon: LucideIcon;
    iconColor: string;
    title: string;
    defaultMessage: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-green-500",
    title: "Email Verified!",
    defaultMessage:
      "Your email has been successfully verified. You can now log in to your account.",
  },
  error: {
    icon: XCircle,
    iconColor: "text-red-500",
    title: "Verification Failed",
    defaultMessage:
      "We couldn't verify your email. The link may have expired or is invalid.",
  },
  invalid: {
    icon: XCircle,
    iconColor: "text-red-500",
    title: "Invalid Verification Link",
    defaultMessage: "The verification link is invalid or missing a token.",
  },
};

export function EmailVerificationStatusCard({
  status,
  errorMessage,
  redirectUrl,
  redirectLabel = "Go to login",
}: VerificationStatusCardProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;
  const message = errorMessage ?? config.defaultMessage;

  return (
    <div className="bg-muted flex min-h-screen items-center justify-center px-4">
      <Card className="max-w-md">
        <CardContent className="text-center">
          <Icon className={`mx-auto mb-4 h-16 w-16 ${config.iconColor}`} />
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            {config.title}
          </h1>
          <p className="mb-6 text-gray-600">{message}</p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={redirectUrl}>{redirectLabel}</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
