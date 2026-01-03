"use client";

import { Spinner } from "@/components/ui/spinner";

import { useCurrentUser } from "@/hooks/auth/use-current-user";

const UserDetails = () => {
  const { user, isPending } = useCurrentUser();

  if (isPending) return <Spinner />;

  return <div>{user?.email}</div>;
};

export default UserDetails;
