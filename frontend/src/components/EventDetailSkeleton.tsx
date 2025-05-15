import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

const EventDetailSkeleton = () => {
  return (
    <>
      <Skeleton className="w-full h-72 rounded" />
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Separator className="my-4" />
      <div className="pb-6">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </>
  );
};

export default EventDetailSkeleton;
