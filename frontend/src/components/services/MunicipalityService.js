import { useState } from 'react'
import axios from 'axios'

const MUNICIPALITY_REST_API_URL = process.env.API_URL+'/municipality';

const MunicipalityService = () => {

    const [municipality, getMunicipalities] = useState('');
   
    //da levare solo per test
    const getAllMunicipalities = () => {
        axios.get(`${MUNICIPALITY_REST_API_URL}`)
        .then((res) => {
            const allMunicipalities = res.data//municipalities.allMunicipalities
        })
        .catch(err => console.log(`Error: ${err}`))
    }

    return getAllMunicipalities
}

export default MunicipalityService;
