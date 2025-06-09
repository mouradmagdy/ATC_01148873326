import { getCurrentUser } from "@/apis/auth-api";
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
  return (
    <div className="px-5 py-2">
      <h1 className="font-medium uppercase text-xl">Profile</h1>
      <div className="border mt-4 p-4 rounded">
        <div className="flex items-center justify-between">
          <div className="h-20 w-20 rounded-full ">
            <img src={user.profilePicture} />
          </div>
          <span className="text-base font-normal">
            <span className="font-medium text-primary">Name: </span>
            {user.fullName}
          </span>
          <span className="text-base font-normal">
            <span className="font-medium text-primary">Role: </span>
            {user.role}
          </span>
          <span className="text-base font-normal">
            <span className="font-medium text-primary">Username: </span>
            {user.username}
          </span>
          <span className="text-base font-normal">
            <span className="font-medium text-primary">Gender: </span>
            {user.gender}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
