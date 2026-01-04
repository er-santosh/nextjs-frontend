"use client";

import { type FieldValues } from "react-hook-form";

import {
  InputField,
  type InputFieldProps,
} from "@/components/form-fields/input-field";

interface EmailFieldProps<T extends FieldValues> extends Omit<
  InputFieldProps<T>,
  "name"
> {
  name?: InputFieldProps<T>["name"];
}

export function EmailField<T extends FieldValues>({
  name = "email" as InputFieldProps<T>["name"],
  label = "Email",
  type = "email",
  placeholder = "email@example.com",
  showRequiredIndicator = true,
  disabled = false,
  autoComplete = "email",
  ...props
}: EmailFieldProps<T>) {
  return (
    <InputField
      {...props}
      name={name}
      label={label}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      showRequiredIndicator={showRequiredIndicator}
      autoComplete={autoComplete}
    />
  );
}
