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
    <header className="flex justify-between  px-6 py-4  z-50  border-b">
      <div className="flex   items-center">
        {/* <img src="/logo.png" alt="Logo" className="h-8 w-8 mr-2" /> */}
        <div
          className="text-4xl font-bold cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Tazkarti
        </div>
      </div>
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
    </header>
  );
};

export default Header;
