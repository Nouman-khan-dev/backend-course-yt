import { createContext, useContext, useState } from "react";

const tokenContext = createContext({
  token: localStorage.getItem("token"),
  isLogedIn: false,
  user: null,

  storeTokenInLS: (token) => {
    localStorage.setItem("token", token);
  },
  removeTokenFromLS: () => {
    localStorage.removeItem("token");
  },
});
export const useAuthToken = () => {
  return useContext(tokenContext);
};

export const TokenProvider = tokenContext.Provider;
