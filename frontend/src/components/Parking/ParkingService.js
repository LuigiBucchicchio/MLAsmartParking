import axios from "axios";

const PARKINGPLACES_GET_ALL_URL = "http://localhost:8080/parking-place/allFree";
const PARKINGPLACES_GET_ALL_MUNICIPALITY_URL =
  "http://localhost:8080/parking-place/";
const PARKINGPLACES_POST_ONE_URL = "http://localhost:8080/parking-place/add";
const PARKINGPLACES_MODIFICATION = "http://localhost:8080/parking-place/modify";

const config = {
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
};

class ParkingService {
  getParkingPlaces() {
    return axios.get(PARKINGPLACES_GET_ALL_URL, config);
  }

  getParkingPlacesOfAMunicipality() {
    return axios.get(PARKINGPLACES_GET_ALL_MUNICIPALITY_URL, config);
  }

  parkingPlaceModification(parkingPlaceID, spotsNumber, address) {
    const json = {
      parkingPlaceID: parkingPlaceID,
      spotsNumber: spotsNumber,
      address: address,
    };
    return axios.post(PARKINGPLACES_MODIFICATION, json, config);
  }

  newParkingPlace(spotsNumber, address) {
    const json = { spotsNumber: spotsNumber, address: address };

    return axios.post(PARKINGPLACES_POST_ONE_URL, json, config);
  }
}

export default new ParkingService();
