"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { InquirySchema, type InquiryFormData } from "@/schema/inquiry";

import { EmailField } from "@/components/form-fields/email-field";
import { InputField } from "@/components/form-fields/input-field";
import { SelectField } from "@/components/form-fields/select-field";
import { TextareaField } from "@/components/form-fields/textarea-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";

import {
  INQUIRY_TOPIC_OPTIONS,
  TEAM_SIZE_OPTIONS,
} from "@/constants/inquiry-options";

const InquiryForm = () => {
  const { control, handleSubmit } = useForm<InquiryFormData>({
    resolver: zodResolver(InquirySchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      teamSize: "",
      message: "",
    },
  });

  const onSubmit = (_data: InquiryFormData) => {
    // mutate(data, {
    //   onSuccess: success => {
    //     toast.success(success.message);
    //     reset();
    //   },
    //   onError: error => {
    //     toast.error(error.message);
    //   },
    // });
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <InputField
              control={control}
              name="name"
              label="Full Name"
              placeholder="e.g. John Doe"
              showFieldError
            />
            <EmailField control={control} name="email" showFieldError />
            <SelectField
              control={control}
              name="topic"
              label="Topic"
              options={INQUIRY_TOPIC_OPTIONS}
              showFieldError
            />
            <SelectField
              control={control}
              name="teamSize"
              label="Team Size"
              options={TEAM_SIZE_OPTIONS}
              showFieldError
            />
            <TextareaField
              control={control}
              name="message"
              label="Describe your inquiry"
              placeholder="Please provide as much detail as possible so we can assist you better..."
              showFieldError
              showCharacterCount
              maxLength={400}
            />
            <Button
              type="submit"
              //  isLoading={isPending}
            >
              Submit Inquiry
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default InquiryForm;
