import { Fragment, useState } from "react";
import axios from "axios";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignInForm from "./components/Auth/SignInForm";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const loginHandler = (data) => {
    axios
      .post("http://localhost:8080/login", {
        username: data.email,
        password: data.password,
      })
      .then((user) => {
        console.log("Stemo qua");
        console.log(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logoutHandler = () => {
    console.log("inside logout handler");
    setIsLoggedIn(false);
  };

  const [token, setToken] = useState();

  if(!token) {
    return <SignInForm setToken={setToken} />
  }

  return (
    <Switch>
      <Route path="/">
        <Home logout={logoutHandler} />
      </Route>
    </Switch>
  );
}

export default App;
