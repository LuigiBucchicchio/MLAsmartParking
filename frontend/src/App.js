import {Fragment, useState } from 'react';
import axios from 'axios';

import Home from './components/Home/Home'
import Login from './components/Auth/Login'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const api = axios.create({
  baseURL: 'http://localhost:8080'
})

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const loginHandler = (data) => {
    axios.post('http://localhost:8080/login', {
      email    : data.email,
      password : data.password
    })
  .then(user => {
    console.log(user)
    setIsLoggedIn(true);
  })
  .catch(err => {
    console.log(err)
  })
  };

  const logoutHandler = () => {
    console.log("inside logout handler")
    setIsLoggedIn(false);
  };

  return (
    <Fragment>
      {
        isLoggedIn ? 
        <div>
          <Home logout={logoutHandler}/>
        </div> : <Login login={loginHandler} error={error}/>
      }
  
    </Fragment>
    
  );
}

export default App;
