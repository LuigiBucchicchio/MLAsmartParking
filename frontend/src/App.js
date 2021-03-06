import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import useToken from "./components/Auth/useToken";
import useRole from "./components/Auth/useRole";
import "bootstrap/dist/css/bootstrap.min.css";
import AddParkingPlaceComponent from "./components/Parking/AddParkingPlaceComponent";
import AssignPolicemanComponent from "./components/Policeman/AssignPolicemanComponent";
import Auth from "./components/Auth/Auth";
import DriverProfile from "./components/Driver/DriverProfile";
import HomeComponent from "./components/Home/HomeComponent";
import HeaderDriver from "./components/Layout/HeaderDriver";
import Header from "./components/Layout/Header";
import ListDriversComponent from "./components/Driver/ListDriversComponent";
import ListMunicipalitiesComponent from "./components/Municipality/ListMunicipalitiesComponent";
import ListPolicemenComponent from "./components/Policeman/ListPolicemenComponent";
import MunicipalityComponent from "./components/Municipality/MunicipalityComponent";
import MunicipalityParkingPlacesComponent from "./components/Parking/MunicipalityParkingPlacesComponent";
import ParkingPlaceModificationComponent from "./components/Parking/ParkingPlaceModificationComponent";
import PolicemanComponent from "./components/Policeman/PolicemanComponent";
import ReservationComponent from "./components/Reservation/ReservationList"
import VehicleComponent from "./components/Vehicle/VehicleList"
import UnassignPolicemanComponent from "./components/Policeman/UnassignPolicemanComponent";

import "./App.css";
require('dotenv').config()

function App() {
  const { role, setRole, removeRole } = useRole();
  const { token, setToken, removeToken } = useToken();

  const setUserData = (token, role) => {
    setToken(token);
    setRole(role);
  };

  const logoutHandler = () => {
    removeToken();
    removeRole();
  };

  const pageName = "Test"

  if (!token) {
    return <Auth auth={setUserData} />;
  }

  var RoleHeader;

  // select which header show based on the role
  if (role === process.env.REACT_APP_ROLE_DRIVER) {
    RoleHeader = HeaderDriver;
  }
  else 
  {
    RoleHeader = Header;
  }
  return (
    
      <BrowserRouter>
        <RoleHeader  pageName={pageName} role={role} logout={logoutHandler}  />
        <Switch>
          <Route exact path="/">
            <HomeComponent role={role}/>
          </Route>
          <Route path="/municipality">
            <MunicipalityComponent />
          </Route>
          <Route exact path="/driver">
            <DriverProfile />
          </Route>
          <Route exact path="/policeman">
            <PolicemanComponent />
          </Route>
          <Route path="/parkingPlaceModification">
            <ParkingPlaceModificationComponent />
          </Route>
          <Route path="/municipalityParkingPlaces">
            <MunicipalityParkingPlacesComponent />
          </Route>
          <Route path="/addParkingPlace">
            <AddParkingPlaceComponent />
          </Route>
          <Route path="/assignPoliceman">
            <AssignPolicemanComponent />
          </Route>
          <Route path="/unassignPoliceman">
            <UnassignPolicemanComponent />
          </Route>
          <Route path="/listPolicemen">
            <ListPolicemenComponent />
          </Route>
          <Route path="/listMunicipalities">
            <ListMunicipalitiesComponent />
          </Route>
          <Route path="/listDrivers">
            <ListDriversComponent />
          </Route>
          <Route path="/driver/reservations">
            <ReservationComponent />
          </Route>
          <Route path="/driver/vehicles">
            <VehicleComponent />
          </Route>
     
        </Switch>
      </BrowserRouter>
    
  );
}

export default App;
