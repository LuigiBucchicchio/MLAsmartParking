import {Fragment} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

import useToken from './components/Auth/useToken';
import MunicipalityComponent from './components/Municipality/MunicipalityComponent';
import DriverComponent from './components/Driver/DriverComponent'
import PolicemanComponent from './components/Policeman/PolicemanComponent'
import AdminComponent from './components/Admin/AdminComponent'
import HomeComponent from './components/Home/HomeComponent'
import Auth from "./components/Auth/Auth";
import Header from './components/Layout/Header'
import './App.css';

function App() {

  const [tkn, setTkn] = useState(false);
  const { removeToken } = useToken();

  const setTokenHandler = (data) => {
    console.log("inside setTokenHandler")
    setTkn(data)
  }

  const logoutHandler = () => {
    console.log("inside logout handler");
    removeToken();
    
  };

  if (!tkn) {
    return <Auth auth={setTokenHandler}/>;
  }

  return (
    <Fragment>
      <BrowserRouter>
      <Header />
        <div>
          <Route path="/"/> <HomeComponent logout={logoutHandler} /><Route/>
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
