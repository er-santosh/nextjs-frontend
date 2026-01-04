import GetStartedButton from "@/components/shared/get-started-button";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="border-border relative overflow-hidden border-b px-4 py-20 sm:py-32">
      {/* Background gradient effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="border-primary text-primary mb-6 inline-block rounded-full border px-4 py-2 text-sm">
          Modern Next.js Stack
        </div>

        <h1 className="mb-6 bg-linear-to-r from-gray-100 to-gray-400 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl lg:text-7xl">
          Build faster with modern tools
        </h1>

        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
          Everything you need to build production-ready applications. Complete
          with authentication, type-safe APIs, and beautiful UI components.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <GetStartedButton size="lg" />
          <Button size="lg" variant="outline">
            View Documentation
          </Button>
        </div>
      </div>
    </section>
  );
}
