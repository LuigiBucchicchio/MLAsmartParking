import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import { signUp, signIn } from "./AuthService";

import useToken from "./useToken";
import classes from "./Login.module.css";

const SignUpAdmin = (props) => {
  const { register, handleSubmit } = useForm();
  const [isPoliceman, setIsPoliceman] = useState(false);
  const { setToken } = useToken();

  //state of role
  const [role, setRole] = useState();

  const alert = useAlert();

  const handleRole = (e) => {
    console.log(e.target.value);
    if (e.target.value === "policeman") {
      setIsPoliceman(true);
    } else {
      setIsPoliceman(false);
    }
    console.log(isPoliceman);
    setRole(e.target.value);
  };

  const onSubmit = async (data) => {
    if (role !== "hide") {
      console.log(data);
      signUp(role, data)
        .then((user) => {
          console.log(user);
          signIn(user.data)
            .then((user) => {
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
    } else {
      alert.error("Select a role");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.loginForm}>
      <div className={classes.signUpHtm}>
        <Row className={classes.select}>
          <select
            id="role"
            className={classes.selectSelected}
            onChange={(e) => handleRole(e)}
          >
            <option value="hide">-- Role --</option>
            <option value="municipality">Municipality</option>
            <option value="policeman">Policeman</option>
          </select>
        </Row>
        <Row className={classes.group}>
          <label htmlFor="pass" className={classes.label}>
            Email
          </label>
          <input
            ctype="text"
            className={classes.input}
            {...register("email")}
          />
        </Row>
        <Row className={classes.group}>
          <label htmlFor="user" className={classes.label}>
            Username
          </label>
          <input
            type="text"
            className={classes.input}
            {...register("username")}
          />
        </Row>
        <Row className={classes.group}>
          <label htmlFor="pass" className={classes.label}>
            Password
          </label>
          <input
            type="password"
            className={classes.input}
            data-type="password"
            {...register("password")}
          />
        </Row>
        <Row>
          <Col className={classes.group}>
            <label htmlFor="name" className={classes.label}>
              Name:
            </label>
            <input type="text" {...register("name")} />
          </Col>
          {isPoliceman ? (
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
          ) : (
            <Col className={classes.group}>
              <label htmlFor="user" className={classes.label}>
                Phone Number
              </label>
              <input type="text" {...register("phoneNumber")} />
            </Col>
          )}
        </Row>
        {isPoliceman ? (
          <Row>
            <Col className={classes.group}>
              <label htmlFor="user" className={classes.label}>
                Phone Number
              </label>
              <input type="text" {...register("phoneNumber")} />
            </Col>
            <Col className={classes.group}>
              <label htmlFor="user" className={classes.label}>
                Discrict Code
              </label>
              <input
                type="text"
                className={classes.input}
                {...register("districtCode")}
              />
            </Col>
          </Row>
        ) : null}

        <div className={classes.group}>
          <input type="submit" className={classes.button} value="Sign Up" />
        </div>
      </div>
    </form>
  );
};

export default SignUpAdmin;
