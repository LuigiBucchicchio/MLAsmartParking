import React, { Fragment } from 'react';

import ParkingSummary from './ParkingSummary';
import classes from './Parking.module.css';
import axios from 'axios'

const MUNICIPALITY_REST_API_URL = 'http://localhost:8080/municipality/all';

class Parking extends React.Component {
    state = {
        municipalities: []
    }
    componentDidMount() {
        axios.get(`${MUNICIPALITY_REST_API_URL}`)
            .then(res => {
                console.log(res)
                const persons = res.data;
                this.setState({ persons });
            })
    }

    render() {
        return (
            <Fragment>
                <h1>CIAOOO</h1>
                <ul>
                    {this.state.municipalities.map(municipality =>
                        <li>
                            {municipality.email}
                        </li>)}
                </ul>
            </Fragment>

        );

    }
}

export default Parking;