import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

const page = () => {
  return <div>Dashboard</div>;
};

export default page;
