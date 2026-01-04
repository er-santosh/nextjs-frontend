import useResendVerificationEmail from "@/features/auth/hooks/use-resend-verification-email";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ResendVerificationEmailAlertProps {
  show?: boolean;
  email: string;
  onDismiss?: () => void;
}

const ResendVerificationEmailAlert = ({
  show,
  email,
  onDismiss,
}: ResendVerificationEmailAlertProps) => {
  const { resend, isSending } = useResendVerificationEmail();

  if (!show) return null;

  return (
    <Alert className="mb-4" variant="destructive">
      <AlertTitle>Email Not Verified</AlertTitle>
      <AlertDescription className="mt-2 space-y-3">
        <p>
          Your email address(<span className="underline">{email}</span>)
          hasn&apos;t been verified yet. Please check your inbox for the
          verification email.
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={() => resend(email)}
            isLoading={isSending}
            disabled={!email}
          >
            Resend Verification Email
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="hover:text-destructive hover:bg-card"
            onClick={onDismiss}
          >
            Dismiss
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ResendVerificationEmailAlert;
