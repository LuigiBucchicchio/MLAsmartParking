import axios from "axios";

export const getAllDriverVehicle = () => {
  return axios.get(process.env.REACT_APP_VEHICLEDRIVER_GET, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
};

export const deleteDriverVehicle = async (data) => {
  return await axios
    .delete(
      `${process.env.REACT_APP_VEHICLEDRIVER_DELETE}${data.vehiclePlate}`,
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    )
    .then((deleted) => {
      console.log("Delete ok");
      console.log(deleted);
    })
    .catch((err) => {
      console.log("Error " + err);
    });
};

export const addNewDriverVehicle = async (data) => {
  return await axios
    .post(
      `${process.env.REACT_APP_VEHICLEDRIVER_ADD}`,
      {
        vehiclePlate: data.vehiclePlate,
        brand: data.brand,
        type: data.type,
      },
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    )
    .then((vehicle) => {
      console.log(vehicle);
    })
    .catch((err) => {
      console.log("vehicle error");
      console.log(err);
    });
};
