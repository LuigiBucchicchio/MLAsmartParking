import axios from 'axios'

class PolicemanService {

 
    
async reservationsPlacePlate(address,plate){
    const json = {
      "address": address,
      "plate": plate,
    }
    console.log(json);
    return await axios.post(process.env.REACT_APP_RESERVATIONS_POLICEMAN_CHECK,json,{
        headers: {Authorization: "Bearer "+localStorage.getItem("token") }});
  }

    async getPolicemanProfile(){
        return await axios.get(process.env.REACT_APP_POLICEMAN_GET_ME_URL,{
            headers: {Authorization: "Bearer "+localStorage.getItem("token") }})

    }

    async getPolicemen(){
        return await axios.get(process.env.REACT_APP_POLICEMEN_GET_ALL_URL,{
            headers: {Authorization: "Bearer "+localStorage.getItem("token") }})
     }

     async getPolicemenOfAMunicipality(){
        return await axios.get(process.env.REACT_APP_POLICEMEN_GET_ALL_MUNICIPALITY_URL,{
            headers: {Authorization: "Bearer "+localStorage.getItem("token") }})
     }

     async assignPoliceman(policemanName, spotAddress){
        const json = { "policemanName": policemanName,
        "parkingAddress": spotAddress }
 
        console.log(json);
        return await axios.post(process.env.REACT_APP_POLICEMAN_ASSIGN_URL, json,{
            headers: {Authorization: "Bearer "+localStorage.getItem("token") }})
    }

    async unassignPoliceman(policemanName){
        const json = { "policemanName": policemanName }
        console.log(json);
        return await axios.post(process.env.REACT_APP_POLICEMAN_UNASSIGN_URL, json, {
            headers: {Authorization: "Bearer "+localStorage.getItem("token") }})
    }

}

export default new PolicemanService()