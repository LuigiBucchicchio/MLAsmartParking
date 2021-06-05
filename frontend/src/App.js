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
import ListParkingPlacesComponent from './components/Parking/ListParkingPlacesComponent';
import AddParkingPlaceComponent from './components/Parking/AddParkingPlaceComponent';
import ProfileComponent from './components/Profile/ProfileComponent';
import AssignPolicemanComponent from './components/Policeman/AssignPolicemanComponent';
import ListPolicemenComponent from './components/Policeman/ListPolicemenComponent';
import ListMunicipalitiesComponent from './components/Municipality/ListMunicipalitiesComponent';
import ListDriversComponent from './components/Driver/ListDriversComponent';

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
        <div className='bg' >
          <Route path="/"/> <HomeComponent logout={logoutHandler} /><Route/>
          <Route path="/municipality" component={MunicipalityComponent} />
          <Route path="/driver" component={DriverComponent} />
          <Route path="/policeman" component={PolicemanComponent} />
          <Route path="/admin" component={AdminComponent} />
          <Route path="/listParkingPlaces" component={ListParkingPlacesComponent} />
          <Route path="/addParkingPlace" component={AddParkingPlaceComponent} />
          <Route path="/profile" component={ProfileComponent} />
          <Route path="/assignPoliceman" component={AssignPolicemanComponent} />
          <Route path="/listPolicemen" component={ListPolicemenComponent} />
          <Route path="/listMunicipalities" component={ListMunicipalitiesComponent} />
          <Route path="/listDrivers" component={ListDriversComponent} />
        </div>
      </BrowserRouter>
    </Fragment>

  );
}

export default App;
