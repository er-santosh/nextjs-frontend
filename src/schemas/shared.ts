import { email, string } from "zod";

import { PASSWORD_REGEX } from "@/constants/regex";

export const getUserNameSchema = (name = "Name") =>
  string({ error: `${name} is required` })
    .min(1, `${name} is required`)
    .max(50, `${name} must be less than 50 characters`)
    .regex(
      /^[a-zA-Z\s'-]+$/,
      `${name} can only contain letters, spaces, hyphens, and apostrophes`
    )
    .trim();

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

  let schema = string({ error: `${displayName} is required` })
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
