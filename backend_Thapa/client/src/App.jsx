import "./App.css";
import React from "react";
import Register from "./pages/Register";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/404Error";

export default function App() {
  return (
    <>
      {/* <Header /> */}
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register" element={<ContactUs />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
