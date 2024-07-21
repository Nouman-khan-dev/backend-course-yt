import "./App.css";
import React, { useContext } from "react";
import Register from "./pages/Register";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/404Error";
import { TokenProvider, useAuthToken } from "./contexts/context";
import { Logout } from "./pages/Logout";

export default function App() {
  const { token, storeTokenInLS, removeTokenFromLS } = useAuthToken();
  // const storeTokenInLS = (token) => {
  //   localStorage.setItem("token", token);
  //   console.log("sotoreTokenInLs is triggerd");
  // };
  return (
    <>
      {/* <Header /> */}
      <div>
        <TokenProvider
          value={{ token, storeTokenInLS, removeTokenFromLS }}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register" element={<ContactUs />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </TokenProvider>
      </div>
    </>
  );
}
