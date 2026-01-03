"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { type FieldValues } from "react-hook-form";

import Link from "next/link";

import {
  InputField,
  type InputFieldProps,
} from "@/components/form-fields/input-field";

import { APP_ROUTES } from "@/constants/app-routes";

interface PasswordFieldProps<T extends FieldValues> extends Omit<
  InputFieldProps<T>,
  "name"
> {
  showForgotPassword?: boolean;
  name?: InputFieldProps<T>["name"];
}

export function PasswordField<T extends FieldValues>({
  control,
  disabled = false,
  name = "password" as InputFieldProps<T>["name"],
  placeholder = "********",
  showForgotPassword = false,
  label = "Password",
  helpText,
  ...props
}: PasswordFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputField
      {...props}
      control={control}
      name={name}
      label={label}
      type={showPassword ? "text" : "password"}
      placeholder={placeholder}
      disabled={disabled}
      helpText={helpText}
      autoComplete="current-password"
      className="pr-10"
      labelExtra={
        showForgotPassword ? (
          <Link
            href={APP_ROUTES.AUTH.FORGOT_PASSWORD}
            className="text-primary-800 text-sm hover:underline"
          >
            Forgot your password?
          </Link>
        ) : null
      }
      inputWrapper={input => (
        <div className="relative">
          {input}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
    />
  );
}
