import React from 'react';
import ParkingService from './ParkingService';
import "./ParkingButton.css";
import {Link} from 'react-router-dom';

class MunicipalityParkingPlacesComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          parkingplaces: []
        }
      }

    componentDidMount() {
        ParkingService.getParkingPlacesOfAMunicipality().then((response) => {
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
                           <th scope="col">Your Parking Places</th>
                       </tr>
                   </thead>
                   <tbody>
                   </tbody>
               </table>
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">ParkingPlace ID</th>
                            <th scope="col">ParkingPlace spotsNumber</th>
                            <th scope="col">ParkingPlace address</th>
                            <th scope="col">Actions</th>
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
                                        <td><Link to="/parkingPlaceModification"><modifybutton><hover></hover></modifybutton></Link></td>
                                    </tr>
                            )
                        }
                    </tbody>

                </table>

            </div>
        )
    }

}

export default MunicipalityParkingPlacesComponent