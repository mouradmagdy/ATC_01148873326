import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Globe, Lock, ShieldIcon, UserRoundPlus } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";

const Header = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuthUser(null);
    navigate("/home");
  };
  console.log(authUser);

  const nameInitials = authUser?.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const fullProfilePicturePath = authUser?.profilePicture;

  return (
    <header className="flex justify-between items-center px-6 py-4 z-50 border-b">
      <div className="flex items-center">
        <div
          className="text-4xl font-bold cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Tazkarti
        </div>
      </div>
      {authUser?.role === "admin" && (
        <span
          className="cursor-pointer flex items-center gap-2"
          onClick={() => navigate("/admin")}
        >
          <ShieldIcon />
          Admin Panel
        </span>
      )}
      <div className="flex items-center gap-4">
        {!authUser ? (
          <>
            <span
              className="cursor-pointer flex items-center gap-2"
              onClick={() => navigate("/signup")}
            >
              <UserRoundPlus />
              Register
            </span>
            <span
              className="cursor-pointer flex items-center gap-2"
              onClick={() => navigate("/login")}
            >
              <Lock />
              Sign in
            </span>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2">
                {fullProfilePicturePath ? (
                  <img
                    src={fullProfilePicturePath}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-800">
                      {nameInitials}
                    </span>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" border rounded shadow-lg z-50">
              <DropdownMenuItem
                onSelect={() => navigate("/profile")}
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
        )}

        <span className="cursor-pointer flex items-center gap-2">
          <Globe />
          English
        </span>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
