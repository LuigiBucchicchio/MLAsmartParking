import React from 'react';
import Map from '../Layout/Map'

class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value : ''
        }
    }

    render(){
        return(
            <>
            <Map />
            </>
        )
    }


}
export default HomeComponent