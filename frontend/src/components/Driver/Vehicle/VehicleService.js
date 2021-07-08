import axios from "axios";

const VEHICLEDRIVER_GET = 'http://localhost:8080/driver/vehicle/all';

const VehicleService = () => {
    const getAllDriverVehicle = () => {
        axios
            .get('/posts')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}