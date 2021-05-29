import React from "react";
import { useForm } from "react-hook-form";

import classes from "./Login.module.css";

const SignUpForm = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    props.login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.loginForm}>

    </form>
  );
};

export default SignUpForm;
