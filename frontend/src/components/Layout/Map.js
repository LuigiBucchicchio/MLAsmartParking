import React from "react";
import GoogleMapReact from "google-map-react";

import Marker from "./Marker"

export default function SimpleMap({parkingPlaces}) {

  return (
    <div style={{ height: "80vh", width: "100%" }}>
  
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyADZURjC9KcEyYS_hpFeS6Gyo7aMim3eF4" }}
          defaultCenter={[41.9867874, 14.9774042]}
          defaultZoom={14}
        >
        
          {parkingPlaces.map((place) => {
            return <Marker
              key={place.id}
              text={place.address}
              lat={place.lat}
              lng={place.lng}
            />
          })}
        </GoogleMapReact>
      
    </div>
  );
}
