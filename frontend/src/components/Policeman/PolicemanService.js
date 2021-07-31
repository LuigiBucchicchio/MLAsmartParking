import axios from 'axios'

const POLICEMEN_GET_ALL_URL = 'http://localhost:8080/policeman/all';
const POLICEMEN_GET_ALL_MUNICIPALITY_URL = 'http://localhost:8080/policeman/all/municipality';
const POLICEMAN_ASSIGN_URL = 'http://localhost:8080/policeman/assign';
const POLICEMAN_UNASSIGN_URL = 'http://localhost:8080/policeman/unassign';
const POLICEMAN_GET_ME_URL = 'http://localhost:8080/policeman/me';


const config = {
    headers: {Authorization: "Bearer "+localStorage.getItem("token") }
};



class PolicemanService {

    async getPolicemanProfile(){
        return await axios.get(POLICEMAN_GET_ME_URL,config)

    }

    async getPolicemen(){
        return await axios.get(POLICEMEN_GET_ALL_URL,config)
     }

     async getPolicemenOfAMunicipality(){
        return await axios.get(POLICEMEN_GET_ALL_MUNICIPALITY_URL,config)
     }

     async assignPoliceman(policemanName, spotAddress){
        const json = { "policemanName": policemanName,
        "parkingAddress": spotAddress }
 
        console.log(json);
        return await axios.post(POLICEMAN_ASSIGN_URL, json,config)
    }

    async unassignPoliceman(policemanName){
        const json = { "policemanName": policemanName }
        console.log(json);
        return await axios.post(POLICEMAN_UNASSIGN_URL, json, config)
    }

}

export default new PolicemanService()