import z, { email } from "zod";

import { PASSWORD_REGEX } from "@/constants/regex";

export const getEmailSchema = (msg?: string) =>
  email(msg ?? "Please enter a valid email.").trim();

interface PasswordSchemaOptions {
  fieldName?: string;
  minLength?: number;
  maxLength?: number;
  requireStrength?: boolean;
}

export const getPasswordSchema = (options: PasswordSchemaOptions = {}) => {
  const {
    fieldName = "password",
    minLength = 8,
    maxLength = 32,
    requireStrength = true,
  } = options;

  const displayName =
    fieldName === "confirmPassword" ? "Confirm password" : "Password";

  let schema = z
    .string({ error: `${displayName} is required` })
    .min(minLength, `${displayName} must be at least ${minLength} characters`)
    .max(maxLength, `${displayName} can not exceed ${maxLength} characters`);

  if (requireStrength) {
    schema = schema.regex(
      PASSWORD_REGEX,
      `${displayName} must contain at least one lowercase letter, one uppercase letter, one number, and one special character`
    );
  }

  return schema;
};
