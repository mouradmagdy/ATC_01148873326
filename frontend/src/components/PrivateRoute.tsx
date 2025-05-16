import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { authUser, isLoading } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (!authUser || authUser.role !== "admin") {
        navigate("/login");
      }
    }
  });

  //  const { user, loading } = React.useContext(AuthContext);
  // if (loading) return <div>Loading...</div>;
  // if (!user || user.role !== 'Admin') return <Navigate to="/" />;
  // return children;

  return <div>{children}</div>;
};

export default PrivateRoute;
