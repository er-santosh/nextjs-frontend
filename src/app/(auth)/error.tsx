"use client";

import { useEffect } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { APP_ROUTES } from "@/constants/app-routes";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="flex max-w-md flex-col items-center text-center">
        <h2 className="mb-6 text-5xl font-semibold">Oops!</h2>
        <h3 className="mb-1.5 text-3xl font-semibold">Something went wrong</h3>
        <p className="text-muted-foreground mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={reset}
            size="lg"
            className="rounded-lg text-base shadow-sm"
          >
            Try Again
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-lg text-base shadow-sm"
          >
            <Link href={APP_ROUTES.AUTH.LOGIN}>Back to Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
