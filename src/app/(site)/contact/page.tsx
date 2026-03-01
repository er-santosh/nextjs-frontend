import type { Metadata } from "next";

import { InfoContent } from "@/features/contact/components/info-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <InfoContent />
      </div>
    </section>
  );
}
