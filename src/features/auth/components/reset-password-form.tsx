"use client";

import { useResetPasswordForm } from "@/features/auth/hooks/use-reset-password-form";

import { PasswordField } from "@/components/form-fields/password-field";
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

const InvalidTokenCard = () => (
  <div className="flex grow items-center justify-center p-4">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-foreground text-center text-3xl font-bold">
          Invalid Reset Link
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground text-center">
            This password reset link is invalid or has expired.
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
);

interface ResetPasswordFormProps {
  token: string | null;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { form, handleSubmit, isSubmitting } = useResetPasswordForm(token);

  if (!token) {
    return <InvalidTokenCard />;
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <PasswordField
                name="newPassword"
                label="New Password"
                control={form.control}
                disabled={isSubmitting}
                showFieldError
              />
              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
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
                  Submit
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
