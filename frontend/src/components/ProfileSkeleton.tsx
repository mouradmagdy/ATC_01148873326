import { Skeleton } from "./ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="px-5 py-2">
      <div className="border mt-4 p-4 rounded">
        <div className="flex items-center justify-between">
          <div className="text-base font-normal flex items-center gap-2">
            <span className="font-medium text-primary">Name: </span>
            <Skeleton className="inline-block h-4 w-32" />
          </div>
          <div className="text-base font-normal flex items-center gap-2">
            <span className="font-medium text-primary">Role: </span>
            <Skeleton className="inline-block h-4 w-24" />
          </div>
          <div className="text-base font-normal flex items-center gap-2">
            <span className="font-medium text-primary">Username: </span>
            <Skeleton className="inline-block h-4 w-28" />
          </div>
          <div className="text-base font-normal flex items-center gap-2">
            <span className="font-medium text-primary">Gender: </span>
            <Skeleton className="inline-block h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
