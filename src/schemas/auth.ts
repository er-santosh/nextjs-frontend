import { object, z } from "zod";

import { getEmailSchema, getPasswordSchema } from "@/schemas/shared";

export const RegisterInputSchema = object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must not exceed 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must not exceed 50 characters")
    .trim(),
  email: getEmailSchema(),
  password: getPasswordSchema({
    fieldName: "password",
  }),
  confirmPassword: getPasswordSchema({
    fieldName: "confirmPassword",
    requireStrength: false,
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof RegisterInputSchema>;

export const LoginInputSchema = object({
  email: getEmailSchema(),
  password: getPasswordSchema({
    fieldName: "password",
    minLength: 1,
    requireStrength: false,
  }),
});

export type LoginInput = z.infer<typeof LoginInputSchema>;

export const ForgotPasswordInputSchema = object({
  email: getEmailSchema(),
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordInputSchema>;

export const ResetPasswordInputSchema = object({
  password: getPasswordSchema({ fieldName: "password" }),
  confirmPassword: getPasswordSchema({
    fieldName: "confirmPassword",
    requireStrength: false,
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordInputSchema>;
