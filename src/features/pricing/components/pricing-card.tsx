import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <Card
      className={`relative flex flex-col transition-all duration-200 ${
        plan.highlighted
          ? "border-primary/50 ring-primary/20 shadow-lg ring-1"
          : "border-border hover:border-primary/30"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground">
            Most Popular
          </Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <div className="mb-6">
          <span className="text-4xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground ml-2 text-sm">
            {plan.period}
          </span>
        </div>

        <ul className="mb-8 flex-1 space-y-4">
          {plan.features.map(feature => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="text-primary mt-0.5 h-5 w-5 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          size="lg"
          className="w-full"
          variant={plan.highlighted ? "default" : "outline"}
        >
          {plan.cta}
        </Button>
      </CardContent>
    </Card>
  );
}
