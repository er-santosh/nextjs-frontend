"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const homeUrl = isAdminRoute ? "/admin/dashboard" : "/";

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="relative mb-8 aspect-square h-[clamp(200px,40vw,300px)]">
          <Image
            src="/assets/images/404.webp"
            alt="404 illustration"
            fill
            className="object-contain"
          />
        </div>

        <h2 className="mb-6 text-5xl font-semibold">Whoops!</h2>
        <h3 className="mb-1.5 text-3xl font-semibold">Page Not Found</h3>
        <p className="text-muted-foreground mb-6">
          The page you&apos;re looking for isn&apos;t found, we suggest you back
          to home.
        </p>
        <Button asChild size="lg" className="rounded-lg text-base shadow-sm">
          <Link href={homeUrl}>Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
