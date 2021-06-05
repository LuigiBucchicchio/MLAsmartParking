import React from 'react';
import ParkingService from './ParkingService';
import "./Parking.css";

class ListParkingPlacesComponent extends React.Component {

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
        ParkingService.getParkingPlaces().then((response) => {
            this.setState({ parkingplaces : response.data})
        }); 
      }

    render() {
        //ritorna in formato tabellare
        return (
               
         <div className= "container">
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
                                parkingplace  =>
                                    <tr key={parkingplace.parkingPlaceID}>
                                        <td> {parkingplace.parkingPlaceID}</td>
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

export default ListParkingPlacesComponent