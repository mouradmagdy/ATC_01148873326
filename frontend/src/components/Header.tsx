import { ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/DarkMode";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useGetUser } from "@/hooks/useGetUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/constants";
// const API_BASE_URL = "http://wbarg.runasp.net";

const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { logout, id, role } = useAuth();
  const { data: fetchedUser, isPending } = useGetUser(id as string);
  if (isPending) {
    return <div>Loading...</div>;
  }
  const { firstName, lastName, email, gender, ssn } = fetchedUser.data;
  let { profilePicturePath } = fetchedUser.data;
  const nameInitials =
    firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  if (profilePicturePath.includes("default-profile")) {
    profilePicturePath = "";
  }
  const fullProfilePicturePath = profilePicturePath
    ? `${API_BASE_URL}/${profilePicturePath}`
    : "";
  const handleLogout = () => {
    setTimeout(() => {
      logout();
      toast.success("Logged out successfully!");
      // navigate("/login");
    }, 500);
  };

  return (
    <header className="flex bg-sidebar-background text-sidebar-foreground border-muted  justify-between items-center px-6 py-4 fixed top-0 left-0 right-0 z-10  border-b border-l  transition-all duration-300">
      {/* Left Section: Logo */}
      <div className="flex items-center gap-2">
        <img src="vite.svg" alt="Logo" className="w-10 h-10" />
        <h1 className="text-lg font-semibold ">Medical Imaging</h1>
      </div>

      {/* Right Section: Profile and Icons */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-4 text-primary">
          <button onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon
                strokeWidth={0.9}
                className="w-6 h-6 hover:cursor-pointer "
              />
            ) : (
              <Sun
                strokeWidth={0.9}
                className="w-6 h-6 hover:cursor-pointer "
              />
            )}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2">
                {fullProfilePicturePath ? (
                  <img
                    src={fullProfilePicturePath}
                    alt="profile picture"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-800">
                      {nameInitials}
                    </span>
                  </div>
                )}
                <div className="flex flex-col">
                  <p className="font-medium text-sm ">
                    {firstName} {lastName}
                  </p>
                  <span className="text-xs text-start text-muted-foreground">
                    {role}
                  </span>
                </div>
                <ChevronDown size={20} className="text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" bg-sidebar-background text-sidebar-foreground border-muted border rounded shadow-lg">
              <DropdownMenuLabel>{email}</DropdownMenuLabel>
              <DropdownMenuSeparator className="" />
              <DropdownMenuItem
                onSelect={() => {
                  navigate("/profile");
                }}
                className="cursor-pointer"
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleLogout}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
