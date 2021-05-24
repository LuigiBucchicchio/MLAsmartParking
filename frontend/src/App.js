import {Fragment} from 'react';
import Header from './components/Layout/Header'
import Parking from './components/Parking/Parking'
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import ParkingComponent from './components/Parking/ParkingComponent';
import MunicipalityComponent from './components/Municipality/MunicipalityComponent';


function App() {
  return (
    <Fragment>
      <Header/>
      <Parking/>
      <ParkingComponent/>
    </Fragment>
    
  );
}

export default App;
