"use client";

import { useRouter, usePathname } from "next/navigation";

import { RefreshCw, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const homeUrl = isAdminRoute ? "/admin/dashboard" : "/";

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="flex max-w-md flex-col items-center text-center">
        <h2 className="mb-6 text-5xl font-semibold">Oops!</h2>
        <h3 className="mb-1.5 text-3xl font-semibold">Something went wrong</h3>
        <p className="text-muted-foreground mb-6">
          {error.message ||
            "An unexpected error occurred. We're working on fixing this issue."}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={reset}
            size="lg"
            className="rounded-lg text-base shadow-sm"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button
            onClick={() => router.push(homeUrl)}
            variant="outline"
            size="lg"
            className="rounded-lg text-base shadow-sm"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
