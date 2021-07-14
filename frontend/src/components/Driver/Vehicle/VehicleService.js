import axios from "axios";

const VEHICLEDRIVER_GET = "http://localhost:8080/driver/vehicle/all";

const config = {
    headers: {Authorization: "Bearer "+localStorage.getItem("token") }
};

export const getAllDriverVehicle = () => {
    return  axios.get(VEHICLEDRIVER_GET,config)
};


export const addNewDriverVehicle = () => {
    return axios.post()
};