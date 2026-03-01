import type { Metadata } from "next";

import PublicProfileCard from "@/features/account/components/public-profile-card";

export const metadata: Metadata = {
  title: "Account Settings",
  robots: { index: false, follow: false },
};

const page = () => {
  return (
    <div>
      <PublicProfileCard />
    </div>
  );
};

export default page;
