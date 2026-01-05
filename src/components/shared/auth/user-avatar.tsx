import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useCurrentUser } from "@/hooks/auth/use-current-user";

import { getNameInitials } from "@/lib/utils/transformer";

interface UserAvatarProps {
  className?: string;
}

export const UserAvatar = ({ className }: UserAvatarProps) => {
  const { user } = useCurrentUser();

  if (!user) return null;
  return (
    <Avatar className={className}>
      <AvatarImage src="/assets/images/profile.png" alt={user.name} />
      <AvatarFallback className="rounded-lg">
        {getNameInitials(user.name ?? "")}
      </AvatarFallback>
    </Avatar>
  );
};
