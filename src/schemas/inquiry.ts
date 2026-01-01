import z from "zod";

import { getEmailSchema } from "@/schemas/shared";

export const InquirySchema = z.object({
  name: z
    .string()
    .min(2, "We need both your first and last names.")
    .max(100, "Name is too long."),
  email: getEmailSchema("We do need an email address to talk to you."),
  topic: z.string().min(2, "Please select a topic"),
  teamSize: z.string().min(1, "Please select a team size"),
  message: z
    .string()
    .min(1, "Please provide more details in your message.")
    .max(400, "Message cannot exceed 400 characters."),
});

export type InquiryFormData = z.infer<typeof InquirySchema>;
