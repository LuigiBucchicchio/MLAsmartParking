import { useState } from 'react'
import axios from 'axios'

const MUNICIPALITY_REST_API_URL = process.env.API_URL+'/municipality';

export default axios.create({
  baseURL: process.env.MUNICIPALITY_REST_API_URL,
  responseType: "json"
});


       
// axios.get(`${MUNICIPALITY_REST_API_URL}`)
//             .then(res => {
//                 console.log(res)
//                 const persons = res.data;
//                 this.setState({ persons });
//             })
//}

