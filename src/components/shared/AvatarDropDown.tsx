import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

interface UserAvatarDropdownProps {
  user: {
    name: string;
    email: string;
  };
  role: string;
  image?: string;
  onLogout: () => void;
}

export const UserAvatarDropdown: React.FC<UserAvatarDropdownProps> = ({
  user,
  role,
  image,
  onLogout,
}) => {
  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        ?.map((word) => word[0])
        ?.join("")
        ?.toUpperCase() || ""
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer size-9 border-2">
          <AvatarImage src={image || ""} alt={`${user?.name}'s profile`} />
          <AvatarFallback>{getInitials(user?.name) || "CN"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to={`/${role}/overview`}>
          {" "}
          <DropdownMenuItem className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:bg-destructive/40"
          onSelect={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatarDropdown;
