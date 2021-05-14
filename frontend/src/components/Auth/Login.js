import { useState } from 'react';

import classes from './Login.module.css'

const Login = (props) => {
    const [details, setDetails] = useState({ name: "", email: "", password: "" });

    const submitHandler = e => {
        e.preventDefault();

        props.login(details);
    }

    return (
        <body>
            <div className={classes.loginWrap}>
                <div className={classes.loginHtml}>
                    <input id="tab-1" type="radio" name="tab" className={classes.signIn} checked />
                    <label for="tab-1" className={classes.tab} >Sign In</label>
                    <input id="tab-2" type="radio" name="tab" className={classes.signUp} />
                    <label for="tab-2" className={classes.tab} >Sign Up</label>
                    <form onSubmit={submitHandler} className={classes.loginForm}>
                        <div className={classes.signInHtm} >

                            <div className={classes.group} >
                                <label htmlFor="name">Name:</label>
                                <input type="text" name="name" id="name" onChange={e => setDetails} />
                            </div>
                            <div className={classes.group} >
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" id="email" />
                            </div>
                            <div className={classes.group} >
                                <label htmlFor="password">Password:</label>
                                <input type="password" name="password" id="password" />
                            </div>
                            <input type="submit" value="LOGIN" />
                        </div>
                    </form>
                </div>
            </div>

        </body>
    );
}

export default Login;