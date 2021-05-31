import axios from 'axios'

const PARKINGPLACES_POST_ONE_URL = 'http://localhost:8080/parking-place/add';

class MunicipalityService {

    newParkingPlace(spotsNumber,address){
        const json = { "spotsNumber": spotsNumber,
        "address": address }

        console.log(json);
        return axios.post(PARKINGPLACES_POST_ONE_URL, json)
    }
}

export default new MunicipalityService()