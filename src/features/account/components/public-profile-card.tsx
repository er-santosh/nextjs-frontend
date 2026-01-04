"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useCurrentUser } from "@/hooks/auth/use-current-user";

const PublicProfileCard = () => {
  const { isPending } = useCurrentUser();

  if (isPending) return <PublicProfileCardSkeleton />;

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-8 md:flex-row">
          {/* <ProfileAvatarCard /> */}
          {/* <ProfileForm /> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicProfileCard;

const PublicProfileCardSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="bg-muted/20 relative flex w-full flex-col items-center gap-4 rounded-lg border p-2 md:w-56 md:shrink-0">
            <Skeleton className="absolute -top-3 left-1/2 h-5 w-16 -translate-x-1/2" />
            <div className="flex max-w-56 flex-col items-center gap-2 rounded-xl px-2 pt-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="size-24 rounded-full" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
          <div className="flex flex-1 flex-col space-y-5">
            <div className="flex flex-1 flex-col">
              <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div className="mt-auto">
                <Skeleton className="my-4 h-px w-full" />
                <div className="flex justify-end">
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
