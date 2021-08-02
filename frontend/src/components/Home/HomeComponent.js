import React, { Fragment } from "react";

import ParkingPlacesList from "../Parking/ParkingPlacesList.js";
import "./Home.css";
import MunicipalityComponent from "../Municipality/MunicipalityComponent.js";
import PolicemanComponent from "../Policeman/PolicemanComponent.js";

const HomeComponent = (props) => {
  
  const role = () => {
    if (props.role === process.env.REACT_APP_ROLE_DRIVER) {
      return (
        <Fragment>
          <ParkingPlacesList />
        </Fragment>
      );
    } else if (props.role === process.env.REACT_APP_ROLE_MUNICIPALITY) {
      return <MunicipalityComponent />;
    } else if (props.role === process.env.REACT_APP_ROLE_POLICEMAN) {
      return <PolicemanComponent />;
    }
  };

  return <Fragment>{role()}</Fragment>;
};

export default HomeComponent;
