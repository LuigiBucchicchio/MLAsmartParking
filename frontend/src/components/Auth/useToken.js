import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    console.log("check get Item")
    const tokenString = localStorage.getItem("token");
    console.log(tokenString)
    return tokenString;
  };

  const [token, setToken, removeToken] =  useState(getToken());

  const saveToken = userToken => {
    console.log("call save Token")
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
