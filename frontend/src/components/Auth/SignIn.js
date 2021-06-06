import { useForm } from "react-hook-form";

import axios from "axios";

import useToken from "./useToken";
import classes from "./Login.module.css";

const SignIn = (props) => {
  const { register, handleSubmit } = useForm();

  const { setToken } = useToken();

  const BASE_URL = "http://localhost:8080";

  const onSubmit = (data) => {
    //AuthService.signInCall(data);
    axios
      .post(`${BASE_URL}/login`, {
        username: data.email,
        password: data.password,
      })
      .then((user) => {
        console.log(user.data)
        setToken(user.headers.authorization);
        props.tkn(true);
      })
      .catch((err) => {
        console.log("orrore");
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.loginForm}>
      <div className={classes.signInHtm}>
        <div className={classes.group}>
          <label htmlFor="email" className={classes.label}>
            Email:
          </label>
          <input type="email" {...register("email")} />
        </div>
        <div className={classes.group}>
          <label htmlFor="password" className={classes.label}>
            Password:
          </label>
          <input type="password" {...register("password")} />
        </div>
        <div className={classes.group}>
          <input type="submit" className={classes.button} value="Sign In" />
        </div>
      </div>
    </form>
  );
};

export default SignIn;
