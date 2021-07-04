import {Fragment} from 'react';

import Parking from '../Parking/Parking';
import DriverFooter from '../Driver/DriverFooter';

const Home = (props) => {
    return(
        <Fragment>
            <Parking/>
            <DriverFooter/>
        </Fragment>        
    )
}

export default Home;