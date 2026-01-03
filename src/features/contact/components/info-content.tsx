import { Mail, CheckCircle } from "lucide-react";

import InquiryForm from "@/features/contact/components/inquiry-form";

import { appConfig } from "@/config/app";

const BenefitItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3">
    <CheckCircle className="text-primary mt-0.5 h-5 w-5 shrink-0" />
    <p className="text-foreground">{text}</p>
  </div>
);

const InfoCard = ({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link?: { text: string; href: string };
}) => (
  <div className="border-border bg-card rounded-xl border p-6">
    <h3 className="text-foreground mb-2 font-semibold">{title}</h3>
    <p className="text-muted-foreground mb-4 text-sm">{description}</p>
    {link && (
      <a
        href={link.href}
        className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
      >
        {link.text} →
      </a>
    )}
  </div>
);

const EmailContact = ({ label, email }: { label: string; email: string }) => (
  <div className="border-border flex items-center gap-3 border-t pt-4">
    <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
      <Mail className="text-muted-foreground h-5 w-5" />
    </div>
    <div>
      <p className="text-foreground text-sm font-medium">{label}</p>
      <a
        href={`mailto:${email}`}
        className="text-primary text-sm hover:underline"
      >
        {email}
      </a>
    </div>
  </div>
);

const CONTACT_CONTENT = {
  title: "We're here to assist",
  subtitle:
    "Got questions? Our dedicated support team is ready to help you succeed.",
  benefits: [
    "Assistance with onboarding, account settings, or plan upgrades.",
    "Submit technical issues or unexpected behavior reports.",
    "Suggest improvements or vote on features for future releases.",
  ],
  email: {
    label: "Rather use email?",
    address: appConfig.helpMail,
  },
};

export const InfoContent = () => {
  return (
    <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
      <div className="space-y-10">
        <div>
          <h1 className="text-foreground mb-4 text-4xl font-bold text-balance sm:text-5xl">
            {CONTACT_CONTENT.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {CONTACT_CONTENT.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {CONTACT_CONTENT.benefits.map((benefit, index) => (
            <BenefitItem key={index} text={benefit} />
          ))}
        </div>
        <InfoCard
          title="Need immediate answers?"
          description="Browse our knowledge base for step-by-step tutorials, troubleshooting guides, and FAQs."
          link={{ text: "Explore Knowledge Base", href: "/faqs" }}
        />
        <InfoCard
          title="Expected Reply Time"
          description="Most inquiries receive a response within 4-8 business hours. Professional and Enterprise customers enjoy priority queue access."
        />

        <EmailContact
          label={CONTACT_CONTENT.email.label}
          email={CONTACT_CONTENT.email.address}
        />
      </div>

      <div>
        <InquiryForm />
      </div>
    </div>
  );
};
