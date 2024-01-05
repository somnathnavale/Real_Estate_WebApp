import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location=useLocation();
  const { user } = useSelector((store) => store.user);
  return user?.username ? <Outlet /> : <Navigate to="/sign-in" state={{from:location}}/>;
};

export default PrivateRoute;
