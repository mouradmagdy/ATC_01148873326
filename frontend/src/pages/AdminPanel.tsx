import { useCallback, useMemo, useState } from "react";
import useDeboundedValue from "@/hooks/useDebounce";
import TableFilters from "@/components/TableFilters";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/admin-portal/EventTableColumns";
import { useGetAllEvents } from "@/hooks/events/getAllEvents";

function AdminPanel() {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // const { data, isPending } = usePatients({ pageNumber, pageSize })
  const { data, isPending } = useGetAllEvents();
  const debouncedSearchValue = useDeboundedValue(searchValue, 300);
  console.log(data);

  const processData = useCallback(
    (data) => {
      let filteredData = [...data];
      // // search
      // if (debouncedSearchValue) {
      //   const searchLower = debouncedSearchValue.toLowerCase();
      //   filteredData = filteredData.filter(
      //     (patient) =>
      //       patient.name.toLowerCase().includes(searchLower) ||
      //       patient.email.toLowerCase().includes(searchLower)
      //   );
      // }

      // sort
      // if (sortBy) {
      //   const [field, order] = sortBy.split("-");
      //   filteredData.sort((a, b) => {
      //     const isAsc = order === "asc" ? 1 : -1;
      //     if (field === "name") {
      //       return isAsc * a.name.localeCompare(b.name);
      //     } else if (field === "age") {
      //       const ageA = new Date(a.dateOfBirth);
      //       const ageB = new Date(b.dateOfBirth);
      //       return -1 * isAsc * (ageA.getTime() - ageB.getTime());
      //     } else if (field === "createdAt") {
      //       const createdAtA = new Date(a.createdAt);
      //       const createdAtB = new Date(b.createdAt);
      //       return isAsc * (createdAtA.getTime() - createdAtB.getTime());
      //     }
      //     return 0;
      //   });
      // }
      return filteredData;
    },
    [sortBy]
  );

  const processedData = useMemo(
    () => processData(data?.data || []),
    [data?.data, processData]
  );

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  // handlers for pagination
  const handleNextPage = () => {
    if (pageNumber < (data?.totalPages || 1)) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const resetPageNumber = () => {
    setPageNumber(1);
  };

  return (
    <>
      <div className="flex">
        <TableFilters
          // addContent="event"
          searchValue={searchValue}
          setSearchValue={(value) => {
            setSearchValue(value);
            resetPageNumber();
          }}
          sortBy={sortBy}
          setSortBy={(value) => {
            setSortBy(value);
            resetPageNumber();
          }}
        />
      </div>

      <DataTable
        columns={columns}
        data={processedData}
        pagination={true}
        loading={isPending}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        totalPages={data?.totalPages || 1}
        currentPage={pageNumber}
        resetPageNumber={resetPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  );
}
export default AdminPanel;
