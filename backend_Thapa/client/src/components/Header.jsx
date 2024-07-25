import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TokenProvider, useAuthToken } from "../contexts/context";
import { Bounce, toast } from "react-toastify";
//
//
//
export default function Header() {
  const { isLogedIn, setIslogedIn, removeTokenFromLS } =
    useAuthToken();
  const navigate = useNavigate();

  const notify = (text) =>
    toast.success(text, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  const handleLogOut = () => {
    // e.preventDefault();
    notify("Successfully logout");
    removeTokenFromLS();
    token = "";
    setIslogedIn(false);
    navigate("/login");
  };

  return (
    <div className="py-3 px-4 text-2xl">
      <div className="w-ful flex gap-5 list-none text-white">
        <Link key={1} to={"/"}>
          Home
        </Link>
        <Link key={6} to={"/services"}>
          Services
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
          <Link key={5} onClick={handleLogOut} to={"/login"}>
            Logout
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
