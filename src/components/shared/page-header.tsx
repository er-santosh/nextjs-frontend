"use client";

import type React from "react";

import { Skeleton } from "@/components/ui/skeleton";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">{actions}</div>
    </div>
  );
}

interface PageHeaderSkeletonProps {
  showDescription?: boolean;
  actionCount?: number;
}

export function PageHeaderSkeleton({
  showDescription = true,
  actionCount = 0,
}: PageHeaderSkeletonProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        {showDescription && <Skeleton className="h-4 w-72" />}
      </div>
      {actionCount > 0 && (
        <div className="flex items-center gap-3">
          {Array.from({ length: actionCount }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-24" />
          ))}
        </div>
      )}
    </div>
  );
}
