import axios from "axios";

const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
};

export const reserveParkingSpot = (data) => {
    console.log(data)
    console.log(data.parkingPlaceId)
    console.log(data.endingTime)
  console.log(process.env.REACT_APP_PARKINGSPOT_NEW_RESERVATION);
  const json = {
    vehiclePlate: data.vehiclePlate,
    startingTime: data.startingTime,
    endingTime: data.endingTime
  };
  return axios.post(
    process.env.REACT_APP_PARKINGSPOT_NEW_RESERVATION +
      `${data.parkingPlaceId}/add`,
    json,
    config
  );
};
