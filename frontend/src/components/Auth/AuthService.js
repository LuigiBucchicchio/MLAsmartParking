import axios from "axios";

const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
};

export const signUp = (role, data) => {
  if (role === "driver")
    return axios.post(`${process.env.REACT_APP_API_URL}/${role}/add`, {
      email: data.email,
      username: data.username,
      password: data.password,
      name: data.name,
      surname: data.surname,
      phoneNumber: data.phoneNumber,
    });
  else if (role === "policeman")
    return axios.post(`${process.env.REACT_APP_API_URL}/${role}/add`, {
      email: data.email,
      username: data.username,
      password: data.password,
      name: data.name,
      surname: data.surname,
      districtCode: data.districtCode,
      phoneNumber: data.phoneNumber,
    });
  else if (role === "municipality")
    return axios.post(`${process.env.REACT_APP_API_URL}/${role}/add`, {
      email: data.email,
      username: data.username,
      password: data.password,
      name: data.name,
      surname: data.surname,
      phoneNumber: data.phoneNumber,
    });
};

export const signIn = (data) => {
  console.log("login")
  console.log(data)
  console.log(data.email)
  console.log(data.password)
  return axios.post(`${process.env.REACT_APP_API_URL}/login`, {
    username: data.email,
    password: data.password,
  });
};
