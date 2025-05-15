import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, File, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DetailsCell = () => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer text-2xl bg-inherit shadow-none text-sidebar-foreground border-none">
        ...
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-sidebar-background w-40 text-sidebar-foreground border-muted border rounded shadow-lg z-50 fixed -right-4">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center">
          <Eye /> View Details
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center">
          <File /> Update Event
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center">
          <Trash /> Delete Event
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center space-x-3">
        <div>
          <p className="font-medium">{row.original.name}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium 
         `}
      >
        {getValue()}
      </span>
    ),
  },

  {
    accessorKey: "venue",
    header: "Venue",
    cell: ({ row }) => (
      <div>
        <p className="">{row.original.venue}</p>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div>
        <p className="text-sm ">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(row.original.price)}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div>
        <p className="text-sm ">
          {new Date(row.original.date).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div>
        <p className="text-sm ">
          {formatDistanceToNow(new Date(row.original.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "details",
    header: "",
    cell: ({ row }) => <DetailsCell />,
  },
];
