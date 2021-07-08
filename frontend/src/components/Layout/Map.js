import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(props) {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: "60vh", width: "100%" }}>
      <GoogleMapReact
        //chiave di sviluppo associata all'account luigi.bucchicchio@studenti.unicam.it
        bootstrapURLKeys={{ key: "AIzaSyADZURjC9KcEyYS_hpFeS6Gyo7aMim3eF4" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
