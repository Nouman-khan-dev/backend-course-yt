import React from "react";
import Header from "./Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

export default function Home() {
  return (
    <div className="">
      <div className="text-3xl">Home Page</div>
      <div className="border-t-2 border-white p-3">
        <h3 className="text-2xl font-semibold text-start">
          LogedIn users
        </h3>
      </div>
    </div>
  );
}
