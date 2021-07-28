import axios from "axios";

const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
};

export const getDrivers = () => {
  return axios.get(process.env.REACT_APP_DRIVER_GET_ALL_URL, config);
};

export const getProfile = () => {
  console.log(process.env.REACT_APP_DRIVER_PROFILE_URL)
  return axios.get(process.env.REACT_APP_DRIVER_PROFILE_URL, config);
};


export const updateProfile = (data) => {
  const json = {
    email: data.email,
    username: data.username,
    password: data.password,
    name: data.name,
    surname: data.surname,
    phoneNumber: data.phoneNumber,
  };
  return axios.put(process.env.REACT_APP_DRIVER_UPDATE_PROFILE_URL, json, config);
};
