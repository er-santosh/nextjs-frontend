"use client";

import Link from "next/link";

import { BadgeCheck } from "lucide-react";

import { LogoutButton } from "@/features/auth/components/logout-button";

import { UserAvatar } from "@/components/shared/auth/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { useCurrentUser } from "@/hooks/auth/use-current-user";

import { APP_ROUTES } from "@/constants/app-routes";

export default function UserMenu() {
  const { isPending, isAuthenticated, user } = useCurrentUser();

  if (isPending || !isAuthenticated || !user) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="focus-visible:ring-ring cursor-pointer rounded-full focus-visible:ring-2 focus-visible:outline-none"
          aria-label="User menu"
        >
          <UserAvatar className="size-8 rounded-full" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserAvatar className="size-8 rounded-full" />
          <div className="min-w-0 flex-1 text-sm">
            <div className="truncate font-medium">{user.name}</div>
            <div className="text-muted-foreground truncate text-xs">
              {user.email}
            </div>
          </div>
        </div>
        <DropdownMenuItem asChild>
          <Link href={APP_ROUTES.PROTECTED.SETTINGS.ACCOUNT.ROOT}>
            <BadgeCheck />
            Account
          </Link>
        </DropdownMenuItem>
        <Separator className="my-1" />
        <DropdownMenuItem asChild>
          <LogoutButton variant="ghost" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
