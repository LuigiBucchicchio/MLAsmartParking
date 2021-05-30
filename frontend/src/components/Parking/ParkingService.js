import axios from 'axios'

const PARKINGPLACES_GET_ALL_URL = 'http://localhost:8080/parking-place/all';

class ParkingService {

    getParkingPlaces(){
        return axios.get(PARKINGPLACES_GET_ALL_URL);
    }
}

export default new ParkingService()