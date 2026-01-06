"use client";

import { Verified } from "lucide-react";

import useProfileForm from "@/features/account/hooks/use-profile-form";

import { InputField } from "@/components/form-fields/input-field";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useCurrentUser } from "@/hooks/auth/use-current-user";

const ProfileForm = () => {
  const { user } = useCurrentUser();
  const { form, isSubmitting, onSubmit } = useProfileForm();

  return (
    <div className="flex flex-1 flex-col">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col"
      >
        <FieldGroup className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <InputField
                label="First Name"
                name="firstName"
                control={form.control}
                showFieldError
                disabled={isSubmitting}
              />
            </div>
            <div className="flex-1">
              <InputField
                label="Last Name"
                name="lastName"
                control={form.control}
                showFieldError
                disabled={isSubmitting}
              />
            </div>
          </div>
          <Field className="flex flex-col gap-2">
            <FieldLabel className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                Email <Verified className="text-primary size-4.5" />
              </div>
              <Button
                type="button"
                className="h-auto w-fit p-0 text-sm underline"
                variant="link"
              >
                Change Email?
              </Button>
            </FieldLabel>
            <Input value={user?.email} readOnly />
          </Field>
        </FieldGroup>
        <div className="mt-auto">
          <Separator className="my-4" />
          <div className="flex justify-end">
            <Button type="submit" isLoading={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
