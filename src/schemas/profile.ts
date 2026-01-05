import z from "zod";

import { getPasswordSchema, getUserNameSchema } from "@/schemas/shared";

export const UpdateProfileSchema = z.object({
  firstName: getUserNameSchema("First name"),
  lastName: getUserNameSchema(" Last name"),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;

export const ChangePasswordSchema = z
  .object({
    currentPassword: getPasswordSchema({
      fieldName: "currentPassword",
      requireStrength: false,
    }),
    newPassword: getPasswordSchema({ fieldName: "newPassword" }),
    confirmPassword: getPasswordSchema({
      fieldName: "confirmPassword",
      requireStrength: false,
    }),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;
