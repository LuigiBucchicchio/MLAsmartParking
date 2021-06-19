import {Fragment} from 'react';

import HeaderDriver from '../Layout/HeaderDriver'
import Parking from '../Parking/Parking';

const Home = (props) => {
    return(
        <Fragment>
            <HeaderDriver logout={props.logout}/>
            <Parking/>
        </Fragment>        
    )
}

export default Home;