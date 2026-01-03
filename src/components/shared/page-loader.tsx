import { Spinner } from "@/components/ui/spinner";

export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto flex items-center justify-center">
        <Spinner className="size-16" />
      </div>
    </div>
  );
}
