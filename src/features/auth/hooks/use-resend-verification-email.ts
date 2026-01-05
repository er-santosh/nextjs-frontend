import { useApiMutation } from "@/hooks/api/use-api-mutation";

import { authService } from "@/services/auth";

import type { ResendVerificationEmailResponse } from "@/types/api/auth";

const useResendVerificationEmail = () => {
  const { mutateAsync, isPending } = useApiMutation<
    ResendVerificationEmailResponse,
    string
  >({
    mutationFn: email => authService.resendVerificationEmail(email),
  });

  const resend = async (email: string) => {
    await mutateAsync(email);
  };

  return {
    isSending: isPending,
    resend,
  };
};

export default useResendVerificationEmail;
