import React from 'react';
import ParkingService from './ParkingService';

class ParkingComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          parkingplaces: []
        }
      }

    componentDidMount() {
        //this.setState( {parkingplaces : []});
        ParkingService.getParkingPlaces().then((response) => {
            this.setState({ parkingplaces : response.data})
        });
      }

    render() {
        //ritorna in formato tabellare
        var pp = new Array(this.state.parkingplaces);
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
                            pp.map( 
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

export default ParkingComponent