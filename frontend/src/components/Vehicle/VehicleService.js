import axios from "axios";

const VEHICLEDRIVER_GET = "http://localhost:8080/vehicle/driver/all";
const VEHICLEDRIVER_ADD = "http://localhost:8080/vehicle/add";
const VEHICLEDRIVER_DELETE = "http://localhost:8080/vehicle/";

const config = {
    headers: {Authorization: "Bearer "+localStorage.getItem("token") }
};

export const getAllDriverVehicle = () => {
    return  axios.get(VEHICLEDRIVER_GET,config)
};

export const deleteDriverVehicle = async (data) => {
    console.log(config)
    return await axios
    .delete(`${VEHICLEDRIVER_DELETE}${data.vehiclePlate}`, config)
    .then(deleted => {
        console.log("Delete ok");
        console.log(deleted)
    }).catch(err => {
        
        console.log("Error " + err)
    })
}

export const addNewDriverVehicle = async (data, callback) => {
    return await axios
    .post(`${VEHICLEDRIVER_ADD}`, {
        vehiclePlate: data.vehiclePlate,
        brand: data.brand,
        type: data.type
    }, config)
    .then((vehicle) => {
     console.log(vehicle)
    })
    .catch((err) => {
      console.log("vehicle error");
      console.log(err);
    });
};