import type { Metadata } from "next";

import { env } from "@/config/env";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our company",
  openGraph: {
    title: "About Us",
    description: "Learn more about our company",
    url: `${env.NEXT_PUBLIC_API_URL}/about`,
  },
};

export default function AboutPage() {
  return <div>About content</div>;
}
