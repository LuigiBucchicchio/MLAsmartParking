import React from 'react';
import { Fragment } from 'react';

class PolicemanComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value : ''
        }
    }

    render(){
        return(
            <Fragment>
                <h1>Hi Policeman!</h1>
            </Fragment>
        )
    }


}
export default PolicemanComponent