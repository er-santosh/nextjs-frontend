"use client";

import { useForgotPasswordForm } from "@/features/auth/hooks/use-forgot-password-form";

import { EmailField } from "@/components/form-fields/email-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";

import { cn } from "@/lib/utils/classname";

export function ForgotPasswordForm() {
  const { form, handleSubmit, isSubmitting } = useForgotPasswordForm();

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <FieldGroup>
              <EmailField
                control={form.control}
                disabled={isSubmitting}
                showFieldError
              />
              <Field>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="cursor-pointer"
                >
                  Send Reset Link
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
