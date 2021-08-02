import React from "react";
import { Room } from "@material-ui/icons";
import { Fragment } from "react";
import { IconButton } from "@material-ui/core";

export default function Marker(props) {
  
  const showAddress = () => {
    window.open("https://maps.google.com?q="+props.lat+","+props.lng );
  };

  return (
    <Fragment>
      <IconButton onClick={showAddress}>
        <Room />
      </IconButton>
    </Fragment>
  );
}