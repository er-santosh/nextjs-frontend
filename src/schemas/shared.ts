import { email } from "zod";

export const getEmailSchema = (msg?: string) =>
  email(msg ?? "Invalid email address.");
