import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login/index";

function LoginUser() {
  const { userInfo } = useSelector((state) => state.user);
  return userInfo ? <Outlet /> : <Login />;
}

export default LoginUser;
