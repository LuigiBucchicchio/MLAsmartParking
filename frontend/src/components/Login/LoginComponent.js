import React from 'react';

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value : ''
        }
    }

    render(){
        return(
            <h1>Hi Unregistred User!</h1>
        )
    }


}
export default LoginComponent