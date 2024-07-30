import React, { useEffect, useState } from "react";
import { useAuthToken } from "../contexts/context";

export default function Home() {
  const { user, isLogedIn } = useAuthToken();
  const [isLoading, setIsLoading] = useState(false);
  const [render, rerender] = useState(isLogedIn);
  const token = localStorage.getItem("token");
  useEffect(() => {
    rerender((prev) => !prev);
  }, [user]);
  useEffect(() => {
    setIsLoading(!user ? true : false);
  }, [user]);

  return (
    <div className="text-white">
      <header class="relative">
        <img
          src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26e_Background%20Hero.svg"
          alt=""
          class="absolute -z-10 inline-block h-full w-full object-cover"
        />

        <div class="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          <div class="mx-auto max-w-3xl text-center">
            <h1 class="mb-6 pb-4 text-4xl font-bold text-white md:text-6xl">
              The Website You Want Without The Dev Time.
            </h1>
            <p class="mx-auto mb-5 max-w-[528px] text-xl text-[#636262] lg:mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
              ut aliquam, purus sit amet luctus venenatis, lectus
            </p>
            <a
              href="#"
              class="inline-block rounded-full bg-[#c9fd02] px-8 py-4 text-center font-bold text-black transition hover:border-black hover:bg-white">
              Get Started
            </a>
          </div>

          <div class="mx-auto mt-16 grid max-w-[1040px] grid-cols-2 gap-8 py-20 sm:grid-cols-3 sm:gap-12 md:grid-cols-5">
            <div class="mx-auto">
              <img
                src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a267_Microsoft%20Logo.svg"
                alt=""
                class="inline-block"
              />
            </div>
            <div class="mx-auto">
              <img
                src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26a_PayPal%20Logo.svg"
                alt=""
                class="inline-block"
              />
            </div>
            <div class="mx-auto">
              <img
                src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a268_Google%20Logo.svg"
                alt=""
                class="inline-block"
              />
            </div>
            <div class="mx-auto">
              <img
                src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a269_Chase%20Logo.svg"
                alt=""
                class="inline-block"
              />
            </div>
            <div class="mx-auto">
              <img
                src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26b_Walmart%20Logo.svg"
                alt=""
                class="inline-block"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
