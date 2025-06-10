import { getCurrentUser } from "@/apis/auth-api";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import { useEffect, useState } from "react";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);
  if (loading) {
    return <ProfileSkeleton />;
  }
  const nameInitials = user?.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  console.log("User data:", user);
  return (
    <div className="px-5 py-2">
      <h1 className="font-medium uppercase text-xl">Profile</h1>
      <div className="border mt-4 p-4 rounded">
        <div className="flex items-center justify-between">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-base font-medium text-blue-800">
              {nameInitials}
            </span>
          </div>{" "}
          <span className="text-base font-normal">
            <span className="font-medium text-primary">Name: </span>
            {user?.fullName || "N/A"}
          </span>
          <span className="text-base font-normal">
            <span className="font-medium text-primary">Role: </span>
            {user?.role || "N/A"}
          </span>
          <span className="text-base font-normal">
            <span className="font-medium text-primary">Username: </span>
            {user?.username || "N/A"}
          </span>
          <span className="text-base font-normal">
            <span className="font-medium text-primary">Gender: </span>
            {user?.gender || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
