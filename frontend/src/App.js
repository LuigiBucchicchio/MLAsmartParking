import {Fragment} from 'react';
import Header from './components/Layout/Header'
//import Parking from './components/Parking/Parking'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MunicipalityComponent from './components/Municipality/MunicipalityComponent';
import DriverComponent from './components/Driver/DriverComponent'
import PolicemanComponent from './components/Policeman/PolicemanComponent'
import AdminComponent from './components/Admin/AdminComponent'
import LoginComponent from './components/Login/LoginComponent'


function App() {
  return (
    <Fragment>
      <BrowserRouter>
      <Header />
        <div>
          <Route path="/" component={LoginComponent} exact />
          <Route path="/municipality" component={MunicipalityComponent} />
          <Route path="/driver" component={DriverComponent} />
          <Route path="/policeman" component={PolicemanComponent} />
          <Route path="/admin" component={AdminComponent} />
        </div>
      </BrowserRouter>
    </Fragment>

  );
}

export default App;
