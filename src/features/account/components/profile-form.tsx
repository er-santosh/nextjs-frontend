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
    <div className="flex flex-1 flex-col space-y-5">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col"
      >
        <FieldGroup className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="firstName"
              control={form.control}
              showFieldError
              disabled={isSubmitting}
            />
            <InputField
              label="Last Name"
              name="lastName"
              control={form.control}
              showFieldError
              disabled={isSubmitting}
            />
          </div>
          <Field className="gap-2">
            <FieldLabel className="flex justify-between">
              <div className="flex gap-1">
                Email <Verified className="text-primary size-4.5" />
              </div>
              <Button
                type="button"
                className="h-0 p-0 underline"
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
