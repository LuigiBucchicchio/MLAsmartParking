import React from 'react';
import Map from '../Layout/Map';
import './Home.css';

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
            <div className= "container">
            <Map />
            </div>
            </>
            
        )
    }


}
export default HomeComponent