import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { TokenProvider, useAuthToken } from "../contexts/context";
import { Bounce, toast } from "react-toastify";
//
//
//
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    removeTokenFromLS();
    token = "";
    setIslogedIn(false);
    navigate("/login");
    notify("Successfully logout");
  };

  useEffect(() => {
    const handleBodyClick = (event) => {
      if (
        !event.target.closest(".menu") &&
        !event.target.closest(".header")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, [isMenuOpen]);

  return (
    <header className="header w-full dark:bg-gray-900">
      <div className="mx-auto z-10 relative bg-white dark:bg-gray-900 flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link
          className="block text-teal-600 dark:text-teal-300"
          to="/">
          <span className="sr-only">Home</span>

          <img
            className="size-14"
            src="./public/logo.png"
            alt="Logo"
          />
        </Link>

        <div className="flex  flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  to={"/"}>
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to={"/services"}
                  className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75">
                  Services
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  to="/contactus">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                  to="/about">
                  About
                </Link>
              </li>
              {isLogedIn ? (
                <li className="ml-3 font-bold">
                  <Link
                    className="text-gray-500 shadow shadow-red-800 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    to="/admin/users">
                    Admin Panel
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </nav>

          <div className=" hidden md:flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {!isLogedIn ? (
                <>
                  {" "}
                  <Link
                    className="block rounded-md  dark:bg-cyan-700 px-5 py-2.5 text-sm font-medium text-white transition  dark:hover:bg-cyan-600 hover:bg-teal-500"
                    to="/login">
                    Login
                  </Link>
                  <Link
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                    to="/register">
                    Register
                  </Link>
                </>
              ) : (
                <Link
                  className="block rounded-md bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white transition dark:hover:bg-cyan-700 hover:bg-teal-500"
                  to=""
                  onClick={handleLogOut}>
                  Logout
                </Link>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* ================================================== */}
      {/* responsive menu  */}
      {/* ================================================== */}
      <div
        className={`menu flex absolute z-[3] shadow shadow-gray-800 ${
          isMenuOpen ? "translate-y-[410px] " : "translate-y-[0vh]  "
        } top-[-350px] h-[360px] duration-300 transition-all ease left-0 md:hidden bg-sky300 w-full flex-col justify-between border- bg-gray-700 text-gray-100`}>
        <div className="px-4 py-6 ">
          <div className="flex gap-4">
            {!isLogedIn ? (
              <>
                {" "}
                <Link
                  to={"/login"}
                  onClick={() => setIsMenuOpen(false)}>
                  <button className="py-2 px-7 rounded-lg bg-gray-800 border-transparent border hover:border-gray-200">
                    Login
                  </button>
                </Link>
                <Link
                  to={"/register"}
                  onClick={() => setIsMenuOpen(false)}>
                  <button className="py-2 px-7 rounded-lg bg-gray-800 border-transparent border hover:border-gray-200">
                    Register
                  </button>
                </Link>
              </>
            ) : isLogedIn ? (
              <Link to={""} onClick={handleLogOut}>
                <button className="py-2 px-7 rounded-lg bg-gray-800 border-transparent border hover:border-gray-200">
                  Logout
                </button>
              </Link>
            ) : (
              ""
            )}
          </div>

          <ul className="mt-6 space-y-1 border-b pb-4 border-gray-300">
            <li>
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/"
                className="block rounded-lg bg-gray-700 hover:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100">
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/services"
                className="block rounded-lg bg-gray-700 hover:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100">
                Services
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/contactus"
                className="block rounded-lg bg-gray-700 hover:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100">
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/about"
                className="block rounded-lg bg-gray-700 hover:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-100">
                About
              </Link>
            </li>
          </ul>
          {isLogedIn ? (
            <li className="list-none mt-4 mp-4 border- border-gray-600 ">
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/admin/users"
                className="flex items-center p-2 text-gray-900  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group">
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
}
