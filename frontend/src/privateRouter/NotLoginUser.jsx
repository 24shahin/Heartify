import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function NotLoginUser() {
  const { userInfo } = useSelector((state) => state.user);
  return userInfo ? <Navigate to={"/"} /> : <Outlet />;
}

export default NotLoginUser;
