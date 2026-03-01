"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useApiMutation } from "@/hooks/api/use-api-mutation";

import { contactService } from "@/services/contact";

import { InquirySchema, type InquiryFormData } from "@/schemas/inquiry";

export function useInquiryForm() {
  const form = useForm<InquiryFormData>({
    resolver: zodResolver(InquirySchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      teamSize: "",
      message: "",
    },
  });

  const { mutate, isPending } = useApiMutation<unknown, InquiryFormData>({
    mutationFn: data => contactService.submitInquiry(data),
    showSuccessToast: true,
    showErrorToast: true,
    onSuccess: () => {
      form.reset();
    },
  });

  return {
    control: form.control,
    handleSubmit: form.handleSubmit(data => mutate(data)),
    isPending,
  };
}
