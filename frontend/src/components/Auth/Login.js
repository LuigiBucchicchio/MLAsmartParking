import { useState } from "react";
import { useForm } from "react-hook-form";

import classes from "./Login.module.css";


const Login = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    props.login(data);
  };

  const checked = true;

  return (
    <div className={classes.body}>
      <div className={classes.loginWrap}>
        <div className={classes.loginHtml}>
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className={classes.signIn}
            defaultChecked={checked}
          />
          <label htmlFor="tab-1" className={classes.tab}>
            Sign In
          </label>
          <input
            id="tab-2"
            type="radio"
            name="tab"
            className={classes.signUp}
          />
          <label htmlFor="tab-2" className={classes.tab}>
            Sign Up
          </label>
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
                <input
                  type="submit"
                  className={classes.button}
                  value="Sign In"
                />
              </div>
            </div>
            <div className={classes.signUpHtm}>
              <div className={classes.group}>
                <label htmlFor="name" className={classes.label}>
                  Name:
                </label>
                <input type="text" {...register("name")} />
              </div>
              <div className={classes.group}>
                <label htmlFor="pass" className={classes.label}>
                  Email Address
                </label>
                <input
                  ctype="text"
                  className={classes.input}
                  {...register("emailreg")}
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
                <label htmlFor="pass" className={classes.label}>
                  Password
                </label>
                <input
                  type="password"
                  className={classes.input}
                  data-type="password"
                  {...register("passwordpass")}
                />
              </div>
              <div className={classes.group}>
                <label htmlFor="pass" className={classes.label}>
                  Repeat Password
                </label>
                <input
                  type="password"
                  className={classes.input}
                  data-type="password"
                />
              </div>
              <div className={classes.group}>
                <label htmlFor="pass" className={classes.label}>
                  Repeat Password
                </label>
                <input
                  type="tel"
                  className={classes.input}
                  data-type="password"
                />
              </div>
              <div className={classes.group}>
                <input
                  type="submit"
                  className={classes.button}
                  value="Sign Up"
                />
              </div>
              <div className={classes.hr}></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
