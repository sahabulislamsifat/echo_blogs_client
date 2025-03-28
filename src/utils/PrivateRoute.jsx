import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/miscellaneous/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }
  if (user) {
    return children;
  } else {
    return (
      <div>
        <Navigate to={"/auth/sign-in"} state={location.pathname}></Navigate>
      </div>
    );
  }
};

export default PrivateRoute;
