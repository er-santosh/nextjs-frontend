"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useLogout } from "@/hooks/auth/use-logout";

const LogoutButton = () => {
  const { handleLogout, isPending } = useLogout();
  return (
    <Button onClick={handleLogout} isLoading={isPending}>
      Logout <LogOut />
    </Button>
  );
};

export default LogoutButton;
