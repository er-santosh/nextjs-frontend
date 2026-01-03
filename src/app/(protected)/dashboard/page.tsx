import LogoutButton from "@/features/auth/components/logout-button";
import UserDetails from "@/features/auth/components/user-details";

const page = () => {
  return (
    <div className="flex flex-col p-6">
      Welcome to dashboard
      <UserDetails />
      <div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default page;
