import { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import ProfileComponent from "./components/Profile/ProfileComponent";
import useToken from "./components/Auth/useToken";
import useRole from "./components/Auth/useRole";
import "./App.css";
import DriverProfileComponent from './components/Driver/DriverProfileComponent';

function App() {
  const { role, setRole, removeRole } = useRole();
  const { token, setToken, removeToken } = useToken();

  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const setUserData = (token, role) => {
    setToken(token);
    setRole(role);
  };

  const logoutHandler = () => {
    console.log("inside logout handler");
    removeToken();
  };

  if (!token) {
    return <Auth auth={setUserData} />;
  }

  return (
    <Fragment>
      <BrowserRouter>
        <div className='bg' >
          <Route path="/" component={HomeComponent} logout={logoutHandler}/>
        <Header loggedRole={role} logout={logoutHandler} />
          <Route path="/municipality" component={MunicipalityComponent} />
          <Route path="/driver" component={DriverComponent} />
          <Route path="/policeman" component={PolicemanComponent} />
          <Route path="/admin" component={AdminComponent} />
          <Route
            path="/listParkingPlaces"
            component={ListParkingPlacesComponent}
          />
          <Route path="/addParkingPlace" component={AddParkingPlaceComponent} />
          <Route path="/driver/profile" component={DriverProfileComponent} />
          <Route path="/assignPoliceman" component={AssignPolicemanComponent} />
          <Route path="/listPolicemen" component={ListPolicemenComponent} />
          <Route
            path="/listMunicipalities"
            component={ListMunicipalitiesComponent}
          />
          <Route path="/listDrivers" component={ListDriversComponent} />
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
