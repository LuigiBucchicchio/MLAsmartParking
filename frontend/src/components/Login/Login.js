import { useState } from 'react';

const Login = (props) => {
    const [ details, setDetails ] = useState({name: "", email: "", password: ""});

    const submitHandler = e => {
        e.preventDefault();

        props.login(details);
    }

    return(
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Login</h2>
                {
                    /* Error */
                }
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" onChange={e => setDetails}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password"/>
                </div>
                <input type="submit" value="LOGIN"/>
            </div>
        </form>
    );
}

export default Login;