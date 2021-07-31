import React from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";

import useToken from "./useToken";
import { signUp, signIn } from "./AuthService";
import classes from "./Login.module.css";

const SignUpDriver = (props) => {
  const { register, handleSubmit } = useForm();
  const { setToken } = useToken();
  const alert = useAlert();

  const onSubmit = async (data) => {
    signUp("driver", data)
      .then((user) => {
        signIn(user.data)
          .then((user) => {
            console.log("dati login " + user);
            setToken(user.data.token);
            props.tkn(user.data.token, user.data.role);
          })
          .catch((err) => {
            console.log("login error");
            console.log(err);
          });
      })
      .catch((err) => {
        if (err.response.status === 409)
          alert.error("Error during registration");
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
