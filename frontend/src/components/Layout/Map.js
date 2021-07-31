import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Room } from "@material-ui/icons";

import Marker from "./Marker";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap({parkingPlaces}) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    setPlaces([
      { key: "gro", name: "elMeDit", lat: 42.9857826, lng: 13.8268443 },
      { key: "sbt", name: "elMeDit", lat: 42.9301004, lng: 13.8086795 },
    ]);
  }, []);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      {places.length === 0 ? (
        console.log("no place to show")
      ) : (
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyADZURjC9KcEyYS_hpFeS6Gyo7aMim3eF4" }}
          defaultCenter={[42.9857826, 13.8268443]}
          defaultZoom={8}
        >
          {parkingPlaces.map((place) => {
            console.log(place)
            // <Marker
              // key={place.id}
              // text={place.name}
              // lat={place.lat}
              // lng={place.lng}
            // />;
          })}
        </GoogleMapReact>
      )}
    </div>
  );
}
