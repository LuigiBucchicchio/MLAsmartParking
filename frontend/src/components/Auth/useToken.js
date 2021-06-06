import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    return tokenString;
  };

  const [token, setToken, removeToken] =  useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  const deleteToken = userToken => {
    localStorage.removeItem("token");
    setToken("")
    //removeToken(userToken);
  }

  return {
    setToken: saveToken,
    removeToken: deleteToken,
    token
  }
}
