import axios from "axios";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import useToken from "./useToken";

import classes from "./Login.module.css";

const SignUpDriver = (props) => {
  const { register, handleSubmit } = useForm();

  const { setToken } = useToken();

  const BASE_URL = "http://localhost:8080";

  const onSubmit = async (data) => {
    await axios
      .post(`${BASE_URL}/driver/add`, {
        email: data.email,
        username: data.username,
        password: data.password,
        name: data.name,
        surname: data.surname,
        phoneNumber: data.phoneNumber,
      })
      .then(async (user) => {
        axios
          .post(`${BASE_URL}/login`, {
            username: data.email,
            password: data.password,
          })
          .then((user) => {
            console.log("dati login " + user);
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.loginForm}>
      <div className={classes.signUpHtm}>
        <Row>
          <Col className={classes.group}>
            <label htmlFor="name" className={classes.label}>
              Name:
            </label>
            <input type="text" {...register("name")} />
          </Col>
          <Col className={classes.group}>
            <label htmlFor="user" className={classes.label}>
              Surname
            </label>
            <input
              type="text"
              className={classes.input}
              {...register("surname")}
            />
          </Col>
        </Row>

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

export default SignUpDriver;
