import axios from "axios";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";

import "./App.css";
import useToken from './components/Auth/useToken';
const BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
});


function App() {
  const { token, setToken, removeToken } = useToken();

  const loginHandler = (data) => {
    axios
      .post(`${BASE_URL}/login`, {
        username: data.email,
        password: data.password,
      })
      .then((user) => {
        setToken(user.headers.authorization);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logoutHandler = () => {
    console.log("inside logout handler");
    removeToken();
    
  };

  if (!token) {
    return <Login login={loginHandler}/>;
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
