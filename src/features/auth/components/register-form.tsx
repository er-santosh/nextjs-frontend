"use client";

import Link from "next/link";

import { useRegisterForm } from "@/features/auth/hooks/use-register-form";

import { EmailField } from "@/components/form-fields/email-field";
import { InputField } from "@/components/form-fields/input-field";
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

export function RegisterForm() {
  const { form, handleSubmit, isSubmitting } = useRegisterForm();

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Fill in the form below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)} noValidate>
            <FieldGroup>
              <InputField
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="John"
                disabled={isSubmitting}
                showFieldError
              />
              <InputField
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                disabled={isSubmitting}
                showFieldError
              />
              <EmailField
                control={form.control}
                disabled={isSubmitting}
                showFieldError
              />
              <FieldGroup className="md:flex-row">
                <PasswordField
                  control={form.control}
                  disabled={isSubmitting}
                  showFieldError
                />
                <PasswordField
                  label="Confirm Password"
                  control={form.control}
                  name="confirmPassword"
                  disabled={isSubmitting}
                  showFieldError
                />
              </FieldGroup>
              <Field>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Creating account..."
                  className="w-full"
                >
                  Create Account
                </Button>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link href={APP_ROUTES.AUTH.LOGIN}>Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
