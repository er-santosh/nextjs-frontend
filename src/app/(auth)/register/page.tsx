import type { Metadata } from "next";

import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Register",
};

const page = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default page;
