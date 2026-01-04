"use client";

import Link from "next/link";

import { useLoginForm } from "@/features/auth/hooks/use-login-form";

import { EmailField } from "@/components/form-fields/email-field";
import { PasswordField } from "@/components/form-fields/password-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";

import { APP_ROUTES } from "@/constants/app-routes";

import { cn } from "@/lib/utils/classname";

interface LoginFormProps {
  callbackUrl: string | null;
}

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const { form, handleSubmit, isSubmitting } = useLoginForm({
    callbackUrl,
  });

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <FieldGroup>
              <EmailField
                control={form.control}
                disabled={isSubmitting}
                showFieldError
              />
              <PasswordField
                control={form.control}
                disabled={isSubmitting}
                showForgotPassword
              />
              <Field>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="cursor-pointer"
                >
                  Login
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href={APP_ROUTES.AUTH.REGISTER}>Register</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
