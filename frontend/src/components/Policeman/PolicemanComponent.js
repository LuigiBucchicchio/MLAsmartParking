import React from 'react';
import { Fragment } from 'react';
import ParkingComponent from '../Parking/ParkingComponent';

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
                <ParkingComponent />
            </Fragment>
        )
    }


}
export default PolicemanComponent