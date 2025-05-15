import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Globe, Lock, UserRoundPlus } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex  px-6 py-4 fixed top-0 left-0 right-0 z-10  border-b border-l  transition-all duration-300">
      <div className="flex   items-center">
        {/* <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" /> */}
        <div className="text-xl font-bold">MyApp</div>
        <div className="flex items-center gap-4">
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
          <span className="cursor-pointer flex items-center gap-2">
            <Globe />
            English{" "}
          </span>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
