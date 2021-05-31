import {Fragment} from 'react';
import axios from "axios";
import {BrowserRouter, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import useToken from './components/Auth/useToken';
import MunicipalityComponent from './components/Municipality/MunicipalityComponent';
import DriverComponent from './components/Driver/DriverComponent'
import PolicemanComponent from './components/Policeman/PolicemanComponent'
import AdminComponent from './components/Admin/AdminComponent'
import HomeComponent from './components/Home/HomeComponent'
import Login from "./components/Auth/Login";
import Header from './components/Layout/Header'
import './App.css';

const BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
});


function App() {
  const { token, setToken, removeToken } = useToken();

  const loginHandler = (data) => {
    console.log("axios call")
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
    <Fragment>
      <BrowserRouter>
      <Header />
        <div>
          <Route path="/" component={HomeComponent} exact />
          <Route path="/municipality" component={MunicipalityComponent} />
          <Route path="/driver" component={DriverComponent} />
          <Route path="/policeman" component={PolicemanComponent} />
          <Route path="/admin" component={AdminComponent} />
        </div>
      </BrowserRouter>
    </Fragment>

  );
}

export default App;
