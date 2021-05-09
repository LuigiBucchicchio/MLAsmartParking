import {Fragment} from 'react';

import Header from '../Layout/Header'
import Parking from '../Parking/Parking';

const Home = (props) => {
    return(
        <Fragment>
            <Header logout={props.logout}/>
            <Parking/>
        </Fragment>        
    )
}

export default Home;