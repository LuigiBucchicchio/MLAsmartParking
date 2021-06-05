import React, { useState } from "react";

import SignUpDriver from "./SignUpDriver";
import SignUpAdmin from "./SignUpAdmin";
import classes from "./Login.module.css";

const SignUp = (props) => {
  const [isAdmin, setisAdmin] = useState(false);

  return (
    <div>
      {isAdmin === false ? (
        <SignUpDriver tkn={props.tkn} />
      ) : (
        <SignUpAdmin tkn={props.tkn} />
      )}

      <div className={classes.hr}></div>
      <div className={classes.group}>
        <button
        type="button"
          className={classes.admin}
          value="Admin"
          onClick={() => setisAdmin(!isAdmin)}
        >
          {isAdmin === false ? "Are you an Admin?" : "No, you're not"}
        </button>
        
      </div>
    </div>
  );
};

export default SignUp;
