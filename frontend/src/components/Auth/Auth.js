import { useState } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import classes from "./Login.module.css";

function Auth(props) {
  const [panel, setPanel] = useState("signin");

  const checked = true;

  return (
    <div className={classes.body}>
      <div className={classes.loginWrap}>
        <div className={classes.loginHtml}>
          <input
            id="tab-1"
            type="radio"
            name="tab"
            onClick={() => setPanel("signin")}
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
            onClick={() => setPanel("signup")}
            className={classes.signUp}
          />
          <label htmlFor="tab-2" className={classes.tab}>
            Sign Up
          </label>

          {panel === "signin" ? <SignIn tkn = {props.auth}/> : null}
          {panel === "signup" ? <SignUp tkn = {props.auth}/> : null}
        </div>
      </div>
    </div>
  );
}

export default Auth;
