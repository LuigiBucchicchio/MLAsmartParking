import axios from 'axios'

const MUNICIPALITY_GET_ALL_URL = 'http://localhost:8080/municipality/all';

const config = {
    headers: {Authorization: localStorage.getItem("token") }
};


class MunicipalityService {

    getMunicipalities(){
        return  axios.get(MUNICIPALITY_GET_ALL_URL,config)
     }

}

export default new MunicipalityService()