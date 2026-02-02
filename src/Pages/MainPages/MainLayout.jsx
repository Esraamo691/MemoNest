import React from "react";
import { Outlet } from "react-router";
import MyNavbar from "../../Components/MyNavbar";

export default function MainLayout() {
  return (
    <>
      <MyNavbar />
      <Outlet />
    </>
  );
}
