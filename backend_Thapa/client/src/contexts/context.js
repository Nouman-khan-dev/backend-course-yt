import { createContext, useContext, useState } from "react";

const tokenContext = createContext({
  token: "",
  storeTokenInLS: (token) => {
    localStorage.setItem("token", token);
    console.log("soteTokenInLS is been triggered");
  },
});
export const useAuthToken = () => {
  return useContext(tokenContext);
};

export const TokenProvider = tokenContext.Provider;
