import React, { useEffect, useState } from "react";
import { useAuthToken } from "../contexts/context";

export default function Home() {
  const { user, isLogedIn } = useAuthToken();
  const [render, rerender] = useState(isLogedIn);
  const token = localStorage.getItem("token");
  useEffect(() => {
    rerender((prev) => !prev);
    // console.log(
    //   "render: ",
    //   render,
    //   "token",
    //   token,
    //   "islogedIN:",
    //   isLogedIn
    // );
  }, [isLogedIn]);

  return (
    <div className="">
      <div className="text-3xl">Home Page</div>
      <div className="border-t-2 border-white p-3">
        <h3 className="text-2xl font-semibold text-start">
          LogedIn users
        </h3>
        <div className="text-2xl">
          <span className="text-4xl font-bold">HI, MR</span>{" "}
          {user ? user.username : ""}
        </div>
      </div>
    </div>
  );
}
