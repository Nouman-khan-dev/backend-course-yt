import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import Register from "./pages/Register";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/404Error";
import { TokenProvider, useAuthToken } from "./contexts/context";
import Services from "./pages/Services";

export default function App() {
  const [user, setUser] = useState(null);
  const { storeTokenInLS, removeTokenFromLS } = useAuthToken();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogedIn, setIsLogedIn] = useState(token);

  const URL = "http://localhost:3000/api/auth/user";

  const getUserData = async () => {
    try {
      if (!user) {
        const response = await fetch(URL, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          return setUser(data.userData);
        } else {
          console.log(response.json().message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      console.log("no token avalible");
    }
    setToken(localStorage.getItem("token"));
  }, [isLogedIn]);

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
            user,
          }}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </TokenProvider>
      </div>
    </>
  );
}
