import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useApiMutation } from "@/hooks/api/use-api-mutation";
import { useCurrentUser } from "@/hooks/auth/use-current-user";

import { authService } from "@/services/auth";

import {
  UpdateProfileSchema,
  type UpdateProfileInput,
} from "@/schemas/profile";

import { setCurrentUserData } from "@/lib/query-client";

import type { UpdateProfileResponse } from "@/types/api/auth";

const useProfileForm = () => {
  const { user } = useCurrentUser();
  const form = useForm<UpdateProfileInput>({
    defaultValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
    },
    resolver: zodResolver(UpdateProfileSchema),
  });

  const { mutateAsync, isPending } = useApiMutation<
    UpdateProfileResponse,
    UpdateProfileInput
  >({
    mutationFn: payload => authService.updateProfile(payload),
    onSuccess(data) {
      setCurrentUserData(data.data?.user);
    },
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    await mutateAsync(data);
  };

  return {
    form,
    onSubmit,
    isSubmitting: isPending,
  };
};

export default useProfileForm;
