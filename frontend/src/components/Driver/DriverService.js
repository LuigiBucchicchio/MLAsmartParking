import axios from 'axios'

const DRIVER_GET_ALL_URL = 'http://localhost:8080/driver/all';

const config = {
    headers: {Authorization: localStorage.getItem("token") }
};


class DriverService {

    getDrivers(){
        return  axios.get(DRIVER_GET_ALL_URL,config)
     }

}

export default new DriverService()