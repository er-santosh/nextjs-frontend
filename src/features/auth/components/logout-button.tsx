"use client";

import { LogOut } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useLogout } from "@/hooks/auth/use-logout";

import { cn } from "@/lib/utils/classname";

interface LogoutButtonProps extends ButtonProps {
  showIcon?: boolean;
  onLogoutStart?: () => void;
  onLogoutSuccess?: () => void;
  onLogoutError?: (error: unknown) => void;
}

export function LogoutButton({
  variant = "ghost",
  size = "default",
  className,
  showIcon = true,
  onLogoutStart,
  onLogoutError,
  onLogoutSuccess,
  children = "Sign out",
}: LogoutButtonProps) {
  const { handleLogout, isPending } = useLogout({
    onLogoutError,
    onLogoutStart,
    onLogoutSuccess,
  });

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "text-destructive hover:text-destructive hover:bg-destructive/20 dark:hover:bg-destructive/20 focus:text-destructive! focus:bg-destructive/20! w-full justify-start",
        isPending && "justify-center",
        className
      )}
      disabled={isPending}
      onClick={handleLogout}
    >
      {isPending ? (
        <Spinner className="text-destructive" />
      ) : (
        <>
          {showIcon && <LogOut className="text-destructive" />}
          {children}
        </>
      )}
    </Button>
  );
}
