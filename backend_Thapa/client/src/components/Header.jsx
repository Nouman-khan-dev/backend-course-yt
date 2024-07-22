import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { TokenProvider, useAuthToken } from "../contexts/context";
//
//
//
export default function Header() {
  const { isLogedIn, setIslogedIn, removeTokenFromLS } =
    useAuthToken();

  const handleLogOut = () => {
    removeTokenFromLS();
    token = "";
    setIslogedIn(false);
  };

  console.log(isLogedIn);
  return (
    <div className="py-3 px-4 text-2xl">
      <div className="w-ful flex gap-5 list-none text-white">
        <Link key={1} to={"/"}>
          Home
        </Link>
        {!isLogedIn ? (
          <>
            <Link key={2} to={"/register"}>
              Register
            </Link>
            <Link key={3} to={"/login"}>
              Login
            </Link>
          </>
        ) : (
          ""
        )}
        <Link key={4} to={"/contactus"}>
          Contact Us
        </Link>
        {isLogedIn ? (
          <Link key={5} onClick={handleLogOut} to={"/"}>
            Logout
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
