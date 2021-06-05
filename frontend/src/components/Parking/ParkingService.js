import axios from 'axios'

const PARKINGPLACES_GET_ALL_URL = 'http://localhost:8080/parking-place/all';
const PARKINGPLACES_POST_ONE_URL = 'http://localhost:8080/parking-place/add';

const config = {
    headers: {Authorization: localStorage.getItem("token") }
};

class ParkingService {

    getParkingPlaces(){
    
       return  axios.get(PARKINGPLACES_GET_ALL_URL,config)
    }

    newParkingPlace(spotsNumber,address){
        const json = { "spotsNumber": spotsNumber,
        "address": address }
 
        console.log(json);
        return axios.post(PARKINGPLACES_POST_ONE_URL, json,config)
    }
}

export default new ParkingService()