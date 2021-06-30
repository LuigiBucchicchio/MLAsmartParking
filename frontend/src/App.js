import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

import AddParkingPlaceComponent from "./components/Parking/AddParkingPlaceComponent";
import AdminComponent from "./components/Admin/AdminComponent";
import AssignPolicemanComponent from "./components/Policeman/AssignPolicemanComponent";
import Auth from "./components/Auth/Auth";
import DriverComponent from "./components/Driver/DriverComponent";
import HomeComponent from "./components/Home/HomeComponent";
import Header from "./components/Layout/Header";
import ListParkingPlacesComponent from "./components/Parking/ListParkingPlacesComponent";
import ListDriversComponent from "./components/Driver/ListDriversComponent";
import ListMunicipalitiesComponent from "./components/Municipality/ListMunicipalitiesComponent";
import ListPolicemenComponent from "./components/Policeman/ListPolicemenComponent";
import MunicipalityComponent from "./components/Municipality/MunicipalityComponent";
import PolicemanComponent from "./components/Policeman/PolicemanComponent";
import useToken from "./components/Auth/useToken";
import useRole from "./components/Auth/useRole";
import "./App.css";
import DriverProfileComponent from './components/Driver/DriverProfileComponent';
import UnassignPolicemanComponent from "./components/Policeman/UnassignPolicemanComponent";
import MunicipalityParkingPlacesComponent from "./components/Parking/MunicipalityParkingPlacesComponent";
import ParkingPlaceModificationComponent from "./components/Parking/ParkingPlaceModificationComponent";

function App() {
  const { role, setRole, removeRole } = useRole();
  const { token, setToken, removeToken } = useToken();

  const setUserData = (token, role) => {
    setToken(token);
    setRole(role);
  };

  const logoutHandler = () => {
    console.log("inside logout handler");
    removeToken();
    removeRole();
  };

  if (!token) {
    return <Auth auth={setUserData} />;
  }

  return (
    <Fragment>
      <BrowserRouter>
        <Header loggedRole={role} logout={logoutHandler} />
        <Switch>
          <Route exact path="/">
            <HomeComponent />
          </Route>
          <Route path="/municipality">
            <MunicipalityComponent />
          </Route>
          <Route path="/driver">
            <DriverComponent />
          </Route>
          <Route path="/policeman">
            <PolicemanComponent />
          </Route>
          <Route path="/admin">
            <AdminComponent />
          </Route>
          <Route path="/listParkingPlaces">
            <ListParkingPlacesComponent />
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
          <Route path="/driverProfile">
            <DriverProfileComponent />
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
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
