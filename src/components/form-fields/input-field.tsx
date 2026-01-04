"use client";

import { type InputHTMLAttributes, type ReactNode } from "react";

import Image from "next/image";

import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils/classname";

export interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  id?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  disabled?: boolean;
  showRequiredIndicator?: boolean;
  autoComplete?: string;
  className?: string;
  labelExtra?: ReactNode;
  showFieldError?: boolean;
  helpText?: string;
  inputWrapper?: (input: ReactNode) => ReactNode;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  iconClassName?: string;
}

export function InputField<T extends FieldValues>({
  control,
  name,
  label,
  id,
  type = "text",
  placeholder,
  disabled = false,
  showRequiredIndicator = true,
  autoComplete,
  className,
  labelExtra,
  showFieldError,
  helpText,
  inputWrapper,
  icon,
  iconPosition = "start",
  iconClassName = "h-5 w-5 text-muted-foreground",
}: InputFieldProps<T>) {
  const inputId = id ?? name;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const showError = showFieldError && fieldState.invalid;
        const hasIcon = Boolean(icon);

        const input = (
          <div className="relative">
            {hasIcon && iconPosition === "start" && (
              <div className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center">
                {typeof icon === "string" ? (
                  <div className={cn("relative", iconClassName)}>
                    <Image
                      src={icon}
                      alt=""
                      fill
                      sizes="20px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className={iconClassName}>{icon}</span>
                )}
              </div>
            )}
            <Input
              {...field}
              value={field.value ?? ""}
              id={inputId}
              type={type}
              placeholder={placeholder}
              className={cn(
                className,
                hasIcon && iconPosition === "start" && "pl-10",
                hasIcon && iconPosition === "end" && "pr-10"
              )}
              aria-invalid={fieldState.invalid}
              disabled={disabled}
              autoComplete={autoComplete}
            />
            {hasIcon && iconPosition === "end" && (
              <div className="pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center">
                {typeof icon === "string" ? (
                  <div className={cn("relative", iconClassName)}>
                    <Image src={icon} alt="" fill className="object-contain" />
                  </div>
                ) : (
                  <span className={iconClassName}>{icon}</span>
                )}
              </div>
            )}
          </div>
        );

        return (
          <Field data-invalid={fieldState.invalid} className="gap-2">
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor={inputId}>
                {label}
                {showRequiredIndicator && (
                  <span className="text-destructive">*</span>
                )}
              </FieldLabel>
              {labelExtra}
            </div>
            {inputWrapper ? inputWrapper(input) : input}
            {helpText && (
              <p className="text-muted-foreground text-sm">{helpText}</p>
            )}
            {showError && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
