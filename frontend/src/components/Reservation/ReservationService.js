import axios from "axios";

export const reserveParkingSpot = (data) => {
  const json = {
    vehiclePlate: data.vehiclePlate,
    startingTime: data.startingTime,
    endingTime: data.endingTime,
  };
  return axios.post(
    process.env.REACT_APP_PARKINGSPOT_NEW_RESERVATION +
      `${data.parkingPlaceId}/add`,
    json,
    { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
  );
};

export const getAllReservationOneDriver = () => {
  return axios.get(
    process.env.REACT_APP_PARKINGSPOT_GET_ALL_RESERVATION_DRIVER,
    { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
  );
};
