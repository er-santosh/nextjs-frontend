import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-20">
      <div className="space-y-4 text-center">
        <Skeleton className="mx-auto h-12 w-2/3" />
        <Skeleton className="mx-auto h-6 w-1/2" />
      </div>
      <Skeleton className="h-96 w-full rounded-xl" />
    </div>
  );
}
