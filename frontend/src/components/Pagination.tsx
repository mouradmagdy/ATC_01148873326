import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Pagination = ({
  table,
  onNextPage,
  onPreviousPage,
  totalPages,
  currentPage,
  setPageSize,
  pageSize,
  resetPageNumber,
}) => {
  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    resetPageNumber();
  };
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center w-40 text-muted-foreground">
        {" "}
        <Select
          value={pageSize?.toString()}
          onValueChange={handlePageSizeChange}
        >
          <SelectTrigger className="rounded">
            <SelectValue placeholder="10 per page" />
          </SelectTrigger>
          <SelectContent className="bg-sidebar-background text-sidebar-foreground border-sidebar-background ">
            <SelectItem className="rounded" value="10">
              10 per page
            </SelectItem>
            <SelectItem className="rounded" value="25">
              25 per page
            </SelectItem>
            <SelectItem className="rounded" value="50">
              50 per page
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex items-center gap-10">
        <Button
          className="px-8 py-2 bg-primary text-primary-foreground  hover:bg-blue-700 rounded disabled:cursor-not-allowed cursor-pointer"
          onClick={onPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          className="px-8 py-2 bg-primary text-primary-foreground hover:bg-blue-700 rounded disabled:cursor-not-allowed cursor-pointer"
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
