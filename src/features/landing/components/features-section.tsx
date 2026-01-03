import { Code2, Lock, Zap, Palette, Database, Shield } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Code2,
    title: "Type-Safe APIs",
    description:
      "tRPC integration for end-to-end type safety between client and server.",
  },
  {
    icon: Lock,
    title: "Authentication",
    description:
      "Better Auth provides a complete auth solution with multiple strategies.",
  },
  {
    icon: Database,
    title: "Database ORM",
    description: "Prisma ORM for type-safe database operations and migrations.",
  },
  {
    icon: Palette,
    title: "UI Components",
    description:
      "Beautiful, accessible shadcn/ui components built with Tailwind CSS.",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Optimized for speed with server components and edge runtime support.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Built-in security best practices and CSRF protection included.",
  },
];

export default function FeaturesGrid() {
  return (
    <section
      id="features"
      className="border-border border-b px-4 py-20 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
            Everything included
          </h2>
          <p className="text-muted-foreground text-lg">
            A complete starter template with all the tools you need
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(feature => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="border-border hover:border-primary/50 transition-colors"
              >
                <CardHeader>
                  <div className="text-primary-foreground bg-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
