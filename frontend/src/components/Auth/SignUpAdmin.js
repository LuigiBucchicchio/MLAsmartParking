import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import useToken from "./useToken";
import classes from "./Login.module.css";

const SignUpAdmin = (props) => {
  const { register, handleSubmit } = useForm();
  const [isPoliceman, setIsPoliceman] = useState(false);
  const { setToken } = useToken();

  //state of role
  const [role, setRole] = useState();

  const BASE_URL = "http://localhost:8080";

  const handleRole = (e) => {
    console.log(e.target.value);
    if (e.target.value == "policeman") {
      setIsPoliceman(true);
    } else {
      setIsPoliceman(false);
    }
    console.log(isPoliceman);
    setRole(e.target.value);
  };

  const onSubmit = async (data) => {
    // if is a policeman we have different parameter: districtCode
    if (isPoliceman) {
      await axios
        .post(`${BASE_URL}/${role}/add`, {
          email: data.email,
          username: data.username,
          password: data.password,
          name: data.name,
          surname: data.surname,
          districtCode: data.districtCode,
          phoneNumber: data.phoneNumber,
        })
        .then((user) => {
          axios
            .post(`${BASE_URL}/login`, {
              username: data.email,
              password: data.password,
            })
            .then((user) => {
              setToken(user.data.token);
              props.tkn(true, user.data.role);
            })
            .catch((err) => {
              console.log("login error");
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("registration error");
          console.log(err);
        });
    } else {
      await axios
        .post(`${BASE_URL}/${role}/add`, {
          email: data.email,
          username: data.username,
          password: data.password,
          name: data.name,
          surname: data.surname,
          phoneNumber: data.phoneNumber,
        })
        .then((user) => {
          axios
            .post(`${BASE_URL}/login`, {
              username: data.email,
              password: data.password,
            })
            .then((user) => {
              setToken(user.data.token);
              props.tkn(true, user.data.role);
            })
            .catch((err) => {
              console.log("login error");
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("registration error");
          console.log(err);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.loginForm}>
      <div className={classes.signUpHtm}>
        <div className={classes.select}>
          <select
            id="role"
            className={classes.selectSelected}
            onChange={(e) => handleRole(e)}
          >
            <option value="hide">-- Role --</option>
            <option value="admin">Admin</option>
            <option value="municipality">Municipality</option>
            <option value="policeman">Policeman</option>
          </select>
        </div>

        <div className={classes.group}>
          <label htmlFor="name" className={classes.label}>
            Name:
          </label>
          <input type="text" {...register("name")} />
        </div>
        <div className={classes.group}>
          <label htmlFor="user" className={classes.label}>
            Surname
          </label>
          <input
            type="text"
            className={classes.input}
            {...register("surname")}
          />
        </div>

        {isPoliceman ? (
          <div className={classes.group}>
            <label htmlFor="user" className={classes.label}>
              Discrict Code
            </label>
            <input
              type="text"
              className={classes.input}
              {...register("districtCode")}
            />
          </div>
        ) : null}

        <div className={classes.group}>
          <label htmlFor="pass" className={classes.label}>
            Email
          </label>
          <input
            ctype="text"
            className={classes.input}
            {...register("email")}
          />
        </div>
        <div className={classes.group}>
          <label htmlFor="user" className={classes.label}>
            Username
          </label>
          <input
            type="text"
            className={classes.input}
            {...register("username")}
          />
        </div>
        <div className={classes.group}>
          <label htmlFor="user" className={classes.label}>
            Phone Number
          </label>
          <input
            type="text"
            className={classes.input}
            {...register("phoneNumber")}
          />
        </div>
        <div className={classes.group}>
          <label htmlFor="pass" className={classes.label}>
            Password
          </label>
          <input
            type="password"
            className={classes.input}
            data-type="password"
            {...register("password")}
          />
        </div>

        <div className={classes.group}>
          <input type="submit" className={classes.button} value="Sign Up" />
        </div>
      </div>
    </form>
  );
};

export default SignUpAdmin;
