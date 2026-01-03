"use client";

import Link from "next/link";

import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

import { appConfig } from "@/config/app";

export default function CTASection() {
  return (
    <section className="border-border border-b px-4 py-20 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
          Start building today
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Clone the repository or deploy directly to Vercel. Get your app
          running in minutes.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button className="cursor-pointer" size="lg" asChild>
            <Link
              href={`https://vercel.com/new/clone?repository-url=${appConfig.repository}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Deploy on Vercel
            </Link>
          </Button>
        </div>

        <p className="text-muted-foreground mt-8 text-sm">
          Open source • MIT License • Maintained by the community
        </p>
      </div>
    </section>
  );
}
