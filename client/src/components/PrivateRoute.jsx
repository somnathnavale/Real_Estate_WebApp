import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useSelector((store) => store.user);
  return user?.username ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
