import React from 'react';
import ParkingService from '../services/ParkingService';

class ParkingComponent extends React.Component {

    constructor (){
        super(props)
        this.state = {
            parkingplaces:[]
        }
    }

    componentDidMount(){
        ParkingService.getParkingPlaces().then((response) => {
            this.setState({ parkingplaces: response.data })
        })
    }
    render (){
        return (
            <div>
                <h1 className = "text-center"> Parking Places List</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> ParkingPlace ID </td>
                            <td> ParkingPlace spotsNumber</td>
                            <td> ParkingPlace address</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.parkingplaces.map(
                                parkingplace =>
                                <tr key= {parkingplace.id}>
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