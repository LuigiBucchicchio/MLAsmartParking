import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const signInUser = (credentials) => {
  axios
    .post("http://localhost:8080/login", {
      username: credentials.email,
      password: credentials.password,
    })
    .then((user) => {
      console.log("stemo qua");
      console.log(user);
      
    })
    .catch((err) => {
      console.log(err);
    });
}

export default function SignInForm({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await signInUser({
      email,
      password,
    });
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

SignInForm.propTypes = {
  setToken: PropTypes.func.isRequired,
};
