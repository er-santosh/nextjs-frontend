import type { Metadata } from "next";

import {
  type PricingPlan,
  PricingCard,
} from "@/features/pricing/components/pricing-card";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing. Choose the perfect plan for your team. Upgrade or downgrade anytime.",
};

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals and small teams",
    price: "$0",
    period: "forever",
    features: [
      "Up to 3 projects",
      "Basic task management",
      "5 team members",
      "Community support",
      "1GB storage",
      "Basic analytics",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing teams and businesses",
    price: "$29",
    period: "per month",
    features: [
      "Unlimited projects",
      "Advanced task management",
      "Unlimited team members",
      "Priority email support",
      "100GB storage",
      "Advanced analytics",
      "Custom workflows",
      "API access",
      "Integrations",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "Custom integrations",
      "SSO & SAML",
      "Advanced security",
      "SLA guarantee",
      "On-premise options",
      "Custom training",
      "Account manager",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="border-border border-b px-4 py-20 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Choose the perfect plan for your team. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-6">
          {plans.map(plan => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
