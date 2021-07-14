import axios from 'axios'

const PARKINGPLACES_GET_ALL_URL = 'http://localhost:8080/parking-place/all';
const PARKINGPLACES_GET_ALL_MUNICIPALITY_URL = 'http://localhost:8080/parking-place/';
const PARKINGPLACES_POST_ONE_URL = 'http://localhost:8080/parking-place/add';
const PARKINGPLACES_MODIFICATION = 'http://localhost:8080/parking-place/modify';
const RESERVE_PARKING_SPOT = 'http://localhost:8080/reservation/{parkingPlaceID}/add'

const config = {
    headers: {Authorization: "Bearer "+localStorage.getItem("token") }
};

class ParkingService {

    getParkingPlaces(){
    
       return  axios.get(PARKINGPLACES_GET_ALL_URL,config)
    }

    getParkingPlacesOfAMunicipality(){
        return  axios.get(PARKINGPLACES_GET_ALL_MUNICIPALITY_URL,config)
     }

     parkingPlaceModification(parkingPlaceID,spotsNumber,address){
        const json = { "parkingPlaceID": parkingPlaceID ,"spotsNumber": spotsNumber,
        "address": address }
         return axios.post(PARKINGPLACES_MODIFICATION, json, config)
     }

    newParkingPlace(spotsNumber,address){
        const json = { "spotsNumber": spotsNumber,
        "address": address }
 
        console.log(json);
        return axios.post(PARKINGPLACES_POST_ONE_URL, json,config)
    }

    reserveParkingSpot(parkingPlaceId){
        const json = {
            "parkingPlaceId": parkingPlaceId 
        }
        return axios.post(process.env.REACT_APP_RESERVATION + '/`${parkingPlaceId}/add`', json,config)
    }
}

export default new ParkingService()