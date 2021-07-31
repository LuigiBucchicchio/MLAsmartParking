import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";

import classes from "./Login.module.css";
import { signIn } from "./AuthService";

const SignIn = (props) => {
  const { register, handleSubmit } = useForm();

  const alert = useAlert();

  const onSubmit = async (data) => {
    await signIn(data)
      .then((user) => {
        props.tkn(user.data.token, user.data.role);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 403) {
            alert.error("Wrong email or password");
          } else if (error.response.status === 500) {
            alert.error("Internal server error");
          } else {
            console.log("orrore");
            console.log(error);
          }
        } else {
          alert.error("Server doesn't response");
        }
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
