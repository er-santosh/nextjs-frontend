"use client";

import { useId, type ReactNode } from "react";

import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils/classname/classname";

export interface TextareaFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  showRequiredIndicator?: boolean;
  className?: string;
  labelExtra?: ReactNode;
  showFieldError?: boolean;
  helpText?: string;
  rows?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export function TextareaField<T extends FieldValues>({
  control,
  name,
  label,
  id,
  placeholder,
  disabled = false,
  showRequiredIndicator = true,
  className,
  labelExtra,
  showFieldError,
  helpText,
  rows = 4,
  maxLength,
  showCharacterCount = false,
  resize = "vertical",
}: TextareaFieldProps<T>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const resizeClasses = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const showError = showFieldError && fieldState.invalid;
        const currentLength = field.value?.length ?? 0;
        const shouldShowCount = showCharacterCount && maxLength;

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
            <Textarea
              {...field}
              value={field.value ?? ""}
              id={inputId}
              placeholder={placeholder}
              className={cn(className, resizeClasses[resize])}
              aria-invalid={fieldState.invalid}
              disabled={disabled}
              rows={rows}
              maxLength={maxLength}
            />
            <div className="flex items-center justify-between gap-2">
              {helpText && (
                <p className="text-muted-foreground text-sm">{helpText}</p>
              )}
              {shouldShowCount && (
                <p className="text-muted-foreground ml-auto text-sm">
                  {currentLength}/{maxLength}
                </p>
              )}
            </div>
            {showError && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
