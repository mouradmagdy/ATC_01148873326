import { Skeleton } from "./ui/skeleton";

const HomeSkeleton = () => {
  return (
    <div className="mx-auto">
      <h1 className="text-3xl font-medium text-left">Event Categories</h1>
      <div className="grid grid-cols-2 rounded-lg my-10">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md overflow-hidden flex flex-col border m-2"
            >
              <Skeleton className="h-52 w-full" />
              <div className="p-3">
                <Skeleton className="h-6 w-3/4 mb-2" />{" "}
                <div className="flex flex-col gap-2 p-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-1/2" />{" "}
                    <Skeleton className="h-6 w-20 rounded-full" />{" "}
                  </div>
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <div className="flex items-center justify-between w-full p-4">
                  <Skeleton className="h-4 w-20" />{" "}
                  <Skeleton className="h-10 w-24" />{" "}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomeSkeleton;
