import {Fragment} from 'react';

import ParkingSummary from './ParkingSummary';
import classes from './Parking.module.css';

const Parking = props => {
    return (
        <Fragment>
            <ParkingSummary/>
        </Fragment>
    );
};

export default Parking;