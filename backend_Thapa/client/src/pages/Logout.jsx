import { Navigate } from "react-router-dom";
import { useAuthToken } from "../contexts/context";
import { useEffect } from "react";

export const Logout = () => {
  let { removeTokenFromLS, token } = useAuthToken();
  useEffect(() => {
    removeTokenFromLS();
    token = "";
  }, [removeTokenFromLS]);

  return <Navigate to={"/"} />;
};
