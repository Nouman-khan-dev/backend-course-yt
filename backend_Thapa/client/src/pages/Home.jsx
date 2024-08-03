import React, { useEffect, useState } from "react";
import { useAuthToken } from "../contexts/context";
import { Link } from "react-router-dom";

export default function Home() {
  const { user, isLogedIn } = useAuthToken();
  const [isLoading, setIsLoading] = useState(false);
  const [render, rerender] = useState(isLogedIn);
  const token = localStorage.getItem("token");
  useEffect(() => {
    rerender((prev) => !prev);
  }, [token]);
  useEffect(() => {
    setIsLoading(!user ? true : false);
  }, [isLogedIn]);

  return (
    <div className="text-white w-full">
      <header className="relative">
        <img
          src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26e_Background%20Hero.svg"
          alt=""
          className="absolute -z-10 inline-block h-full w-full object-cover"
        />

        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 pb-4 text-4xl font-bold text-white md:text-6xl">
              Venturing into the Uncharted, Unlocking New
              Possibilities, and Shaping Futures
            </h1>
            <p className="mx-auto mb-5 max-w-[528px] text-xl text-[#636262] lg:mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              ut aliquam, purus sit amet luctus venenatis, lectus
            </p>
            {!token ? (
              <h3 className="my-4 text-3xl font-semibold">
                Login to see admin panel
              </h3>
            ) : (
              ""
            )}
            <Link
              to={user ? "/admin/users" : "/login"}
              className="inline-block rounded-full bg-[#2c67b5] px-8 py-4 text-center font-bold text-white transition hover:border-black hover:bg-[#345b8e]">
              {user && token ? "Admin Dashboard" : "Login"}
            </Link>
          </div>

          <div className="mx-auto mt-16 grid max-w-[1040px] grid-cols-2 gap-8 py-20 sm:grid-cols-3 sm:gap-12 md:grid-cols-5">
            <div className="mx-auto">
              <img
                src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a267_Microsoft%20Logo.svg"
                alt=""
                className="inline-block"
              />
            </div>
            <div className="mx-auto">
              <img
                src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26a_PayPal%20Logo.svg"
                alt=""
                className="inline-block"
              />
            </div>
            <div className="mx-auto">
              <img
                src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a268_Google%20Logo.svg"
                alt=""
                className="inline-block"
              />
            </div>
            <div className="mx-auto">
              <img
                src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a269_Chase%20Logo.svg"
                alt=""
                className="inline-block"
              />
            </div>
            <div className="mx-auto">
              <img
                src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26b_Walmart%20Logo.svg"
                alt=""
                className="inline-block"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
