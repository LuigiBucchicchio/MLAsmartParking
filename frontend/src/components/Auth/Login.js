import { useState } from 'react';

import classes from './Login.module.css'

const Login = (props) => {
    const [details, setDetails] = useState({ name: "", email: "", password: "" });

    const submitHandler = e => {
        e.preventDefault();
        console.log(details.email)

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
                                <label htmlFor="name" className={classes.label}>Name:</label>
                                <input type="text" name="name" id="name" onChange={e => setDetails} />
                            </div>
                            <div className={classes.group} >
                                <label htmlFor="email" className={classes.label}>Email:</label>
                                <input type="email" name="email" id="email" onChange={e => setDetails}/>
                            </div>
                            <div className={classes.group} >
                                <label htmlFor="password" className={classes.label}>Password:</label>
                                <input type="password" name="password" id="password" onChange={e => setDetails}/>
                            </div>
                            <div className={classes.group}>
                                <input type="submit" className={classes.button} value="Sign In" />
                            </div>
                        </div>
                        <div className={classes.signUpHtm}>
                            <div className={classes.group}>
                                <label for="user" className={classes.label}>Username</label>
                                <input id="user" type="text" className={classes.input} />
                            </div>
                            <div className={classes.group}>
                                <label for="pass" className={classes.label}>Password</label>
                                <input id="pass" type="password" className={classes.input} data-type="password" />
                            </div>
                            <div className={classes.group}>
                                <label for="pass" className={classes.label}>Repeat Password</label>
                                <input id="pass" type="password" className={classes.input} data-type="password" />
                            </div>
                            <div className={classes.group}>
                                <label for="pass"  className={classes.label}>Email Address</label>
                                <input id="pass" type="text"  className={classes.input} />
                            </div>
                            <div className={classes.group}>
                                <input type="submit" className={classes.button} value="Sign Up" />
                            </div>
                            <div  className={classes.hr}></div>
                            <div className={classes.footLnk}>
                                <label for="tab-1">Already Member?</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </body>
    );
}

export default Login;