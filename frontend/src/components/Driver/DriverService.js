import axios from "axios";
const DRIVER_GET_PROFILE_URL = "http://localhost:8080/driver/";
const DRIVER_GET_ALL_URL = "http://localhost:8080/driver/all";

const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
};

export const getDrivers = () => {
  return axios.get(DRIVER_GET_ALL_URL, config);
};

export const getProfile = () => {
  return axios.get(DRIVER_GET_PROFILE_URL, config);
};
