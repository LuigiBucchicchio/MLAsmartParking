import axios from 'axios'

const POLICEMEN_GET_ALL_URL = 'http://localhost:8080/policeman/all';

const config = {
    headers: {Authorization: localStorage.getItem("token") }
};


class PolicemanService {

    getPolicemen(){
        return  axios.get(POLICEMEN_GET_ALL_URL,config)
     }

}

export default new PolicemanService()