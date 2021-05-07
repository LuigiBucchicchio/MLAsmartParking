import axios from 'axios'

const PARKING_REST_API_URL = "http://localhost:8080/parking-place/all";

class ParkingService {

    getParkingPlaces(){
        axios.get(PARKING_REST_API_URL);
    }
}

export default new ParkingService();