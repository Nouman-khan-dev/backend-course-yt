import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import Register from "./pages/Register";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/404Error";
import { TokenProvider, useAuthToken } from "./contexts/context";

export default function App() {
  const { token, storeTokenInLS, removeTokenFromLS } = useAuthToken();
  const [isLogedIn, setIsLogedIn] = useState(false);
  return (
    <>
      <div>
        <TokenProvider
          value={{
            token,
            storeTokenInLS,
            removeTokenFromLS,
            isLogedIn,
            setIsLogedIn,
          }}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </TokenProvider>
      </div>
    </>
  );
}
