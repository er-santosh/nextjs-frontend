"use client";

import { type ReactNode } from "react";

import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectFieldProps<T extends FieldValues> {
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
  options: SelectOption[];
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  id,
  placeholder = "Select an option",
  disabled = false,
  showRequiredIndicator = true,
  className,
  labelExtra,
  showFieldError,
  helpText,
  options,
}: SelectFieldProps<T>) {
  const inputId = id ?? name;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const showError = showFieldError && fieldState.invalid;

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
            <Select
              value={field.value ?? ""}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger
                id={inputId}
                className={className}
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map(option => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
