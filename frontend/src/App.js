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

  const loginHandler = (email, password) => {
    console.log("login handler")
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
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
