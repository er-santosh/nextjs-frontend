import { UserAvatar } from "@/components/shared/auth/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useCurrentUser } from "@/hooks/auth/use-current-user";

const ProfileAvatarCard = () => {
  const { user } = useCurrentUser();

  return (
    <div className="bg-muted/20 relative flex w-full flex-col items-center gap-4 rounded-lg border p-2 md:w-56 md:shrink-0">
      <div className="max-w-56 rounded-xl px-2 pt-4 text-center font-medium">
        <div className="truncate">{user?.name}</div>
        <div className="truncate text-sm font-normal">{user?.email}</div>
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 uppercase">
          {user?.role}
        </Badge>
      </div>
      <UserAvatar className="size-24" />
      <div className="flex w-full flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-primary border-primary hover:text-primary hover:bg-primary/10"
        >
          Change Photo
        </Button>
        <Button
          variant="outline"
          className="text-destructive border-destructive hover:text-destructive hover:bg-destructive/10"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProfileAvatarCard;
