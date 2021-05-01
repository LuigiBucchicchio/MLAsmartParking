import {Fragment} from 'react';

import axios from 'axios';

import Header from './components/Layout/Header'
import Parking from './components/Parking/Parking'
import './App.css';


const api = axios.create({
  baseURL: 'http://localhost:8080'
})

function App() {
  return (
    <Fragment>
      <Header/>
      <Parking/>
    </Fragment>
    
  );
}

export default App;
