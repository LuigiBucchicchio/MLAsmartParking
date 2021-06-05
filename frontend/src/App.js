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
import ListParkingPlacesComponent from './components/Parking/ListParkingPlacesComponent';
import AddParkingPlaceComponent from './components/Parking/AddParkingPlaceComponent';
import ProfileComponent from './components/Profile/ProfileComponent';
import AssignPolicemanComponent from './components/Policeman/AssignPolicemanComponent';
import ListPolicemenComponent from './components/Policeman/ListPolicemenComponent';
import ListMunicipalitiesComponent from './components/Municipality/ListMunicipalitiesComponent';
import ListDriversComponent from './components/Driver/ListDriversComponent';

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
        <div className='bg' >
          <Route path="/" component={HomeComponent} exact />
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
