"use client";

import useChangePasswordForm from "@/features/account/hooks/use-change-password-form";

import { PasswordField } from "@/components/form-fields/password-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";

const ChangePasswordForm = () => {
  const { form, onSubmit, isSubmitting } = useChangePasswordForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex flex-1 flex-col space-y-5">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-1 flex-col"
            >
              <FieldGroup>
                <PasswordField
                  label="Old Password"
                  name="currentPassword"
                  control={form.control}
                  showFieldError
                  disabled={isSubmitting}
                />
                <PasswordField
                  label="New Password"
                  name="newPassword"
                  control={form.control}
                  showFieldError
                  disabled={isSubmitting}
                />
                <PasswordField
                  label="Confirm Password"
                  name="confirmPassword"
                  control={form.control}
                  showFieldError
                  disabled={isSubmitting}
                />
              </FieldGroup>
              <div className="mt-auto">
                <Separator className="my-4" />
                <div className="flex justify-end">
                  <Button type="submit" isLoading={isSubmitting}>
                    Change Password
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
