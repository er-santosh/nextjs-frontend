"use client";

import { Fragment } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbSegment {
  label: string;
  href?: string;
  params?: Record<string, string>;
  isActive?: boolean;
  className?: string;
}

export function BreadcrumbSegments() {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(segment => segment);

  const buildSegments = () => {
    const segments: BreadcrumbSegment[] = [];

    if (pathSegments.length === 0) return segments;

    const slug = pathSegments[0];
    if (!slug) return segments;

    const slugHref = `/${slug}`;

    segments.push({
      label: "Home",
      href: slugHref,
      isActive: pathSegments.length === 1,
    });

    if (pathSegments.length > 1) {
      for (let i = 1; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        if (!segment) continue;

        const href = `/${pathSegments.slice(0, i + 1).join("/")}`;

        segments.push({
          label: segment.charAt(0).toUpperCase() + segment.slice(1),
          href,
          isActive: i === pathSegments.length - 1,
        });
      }
    }

    return segments;
  };

  const segments = buildSegments().filter(
    (segment, index, self) =>
      index === self.findIndex(s => s.href === segment.href)
  );

  return (
    <Breadcrumb className="hidden sm:inline-block">
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          return (
            <Fragment key={segment.label}>
              <BreadcrumbItem>
                {segment.href && !isLast ? (
                  <BreadcrumbLink asChild>
                    <Link href={segment.href}>{segment.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
