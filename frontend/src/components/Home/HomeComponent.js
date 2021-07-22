import React, { Fragment } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import ParkingPlacesList from "../Parking/ParkingPlacesList.js";
import Map from "../Layout/Map.js";
import "./Home.css";

const useStyles = makeStyles((theme) => ({
  paddingTD: {
    padding: theme.spacing(2, 2),
  },
}));

const HomeComponent = (props) => {
  const classes = useStyles();

  function role() {
    if (props.role === process.env.REACT_APP_ROLE_DRIVER) {
      return <ParkingPlacesList />;
    }
  }

  return (
    <Fragment>
      <Map />
      <div>
        <h1 className={clsx(classes.paddingTD)}>Where do you want to go?</h1>
      </div>
      {role()}
    </Fragment>
  );
};

export default HomeComponent;
