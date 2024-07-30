import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import SideMenu from "../components/SideMenu";

export default function AdminLayout() {
  // const navigation = useNavigation();
  return (
    <div className="text-3xl text-white flex ">
      {" "}
      <div className="w-[25%]">
        <SideMenu />
      </div>
      <div className="h-[calc(100vh-67px)] pt- border-t-2 border-gray-700 w-[75%]">
        <Outlet />
      </div>
    </div>
  );
}
