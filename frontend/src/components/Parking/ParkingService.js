import axios from "axios";

class ParkingService {
  getParkingPlaces(tkn) {
    return axios.get(process.env.REACT_APP_PARKINGPLACES_GET_ALL_URL, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  }

  async getParkingPlacesOfAMunicipality() {
    return await axios.get(process.env.REACT_APP_PARKINGPLACES_GET_ALL_MUNICIPALITY_URL, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  }

  async parkingPlaceModification(parkingPlaceID, spotsNumber, address) {
    const json = {
      parkingPlaceID: parkingPlaceID,
      spotsNumber: spotsNumber,
      address: address,
    };
    return await axios.post(process.env.REACT_APP_PARKINGPLACES_MODIFICATION, json, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  }

  async newParkingPlace(spotsNumber, address) {
    const json = { spotsNumber: spotsNumber, address: address };

    return await axios.post(process.env.REACT_APP_PARKINGPLACES_POST_ONE_URL, json, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
  }
}

export default new ParkingService();
