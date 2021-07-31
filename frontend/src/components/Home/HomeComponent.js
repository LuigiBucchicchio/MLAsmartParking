import React, { Fragment } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import ParkingPlacesList from "../Parking/ParkingPlacesList.js";
import Map from "../Layout/Map.js";
import "./Home.css";
import MunicipalityComponent from "../Municipality/MunicipalityComponent.js";
import PolicemanComponent from "../Policeman/PolicemanComponent.js";

const useStyles = makeStyles((theme) => ({
  paddingTD: {
    padding: theme.spacing(2, 2),
  },
}));

const HomeComponent = (props) => {
  const classes = useStyles();

  const role = () => {
    if (props.role === process.env.REACT_APP_ROLE_DRIVER) {
      return (
        <Fragment>
        <Map />
        <div>
        <h1 className={clsx(classes.paddingTD)}>Where do you want to go?</h1>
      </div>
      <ParkingPlacesList />
      </Fragment>
      );
    }else if(props.role === process.env.REACT_APP_ROLE_MUNICIPALITY){
      return(
        <MunicipalityComponent />
      );
    }else if(props.role === process.env.REACT_APP_ROLE_POLICEMAN){
      return(
        <PolicemanComponent />
      );
    }
  };

  return (
    <Fragment>
      {role()}
    </Fragment>
  );
};

export default HomeComponent;
