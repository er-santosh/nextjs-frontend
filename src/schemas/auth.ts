import { object, type z } from "zod";

import {
  getEmailSchema,
  getPasswordSchema,
  getUserNameSchema,
} from "@/schemas/shared";

export const RegisterInputSchema = object({
  firstName: getUserNameSchema("First name"),
  lastName: getUserNameSchema("Last name"),
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
  newPassword: getPasswordSchema({ fieldName: "newPassword" }),
  confirmPassword: getPasswordSchema({
    fieldName: "confirmPassword",
    requireStrength: false,
  }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordInputSchema>;
