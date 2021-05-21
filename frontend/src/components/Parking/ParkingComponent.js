import React from 'react';
import axios from 'axios';
const PARKING_REST_API_URL = "http://localhost:8080//parking-place/all";

class ParkingComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parkingplaces: []
        }
    }

    // componentDidMount() {
    //     //get all parkingPlaces
    //     axios.get(PARKING_REST_API_URL).then((response) => {
    //         this.setState({ parkingplaces: response.data })
    //     })
    // }

    componentDidMount() {
        //get all parkingPlaces
        axios.get("http://localhost:8080/municipality/all").then((response) => {
            this.setState({ parkingplaces: response.data })
        })
    }
    render() {
        //ritorna in formato tabellare
        return (
            <div>
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">ParkingPlace ID</th>
                            <th scope="col">ParkingPlace spotsNumber</th>
                            <th scope="col">ParkingPlace address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.parkingplaces.map(
                                parkingplace =>
                                    <tr key={parkingplace.id}>
                                        <td> {parkingplace.id}</td>
                                        <td> {parkingplace.spotsNumber}</td>
                                        <td> {parkingplace.address}</td>

                                    </tr>
                            )
                        }
                    </tbody>

                </table>

            </div>
        )
    }

}

export default ParkingComponent