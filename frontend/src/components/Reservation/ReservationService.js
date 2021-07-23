import axios from "axios";

const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
};

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
    config
  );
};

export const getAllReservationOneDriver = () => {
  return axios.get(
    process.env.REACT_APP_PARKINGSPOT_GET_ALL_RESERVATION_DRIVER,
    config
  );
};
