import React from 'react';
import ParkingService from '../Parking/ParkingService';
import './ParkingModification.css';


class ParkingPlaceModificationComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parkingplaces: [],
            parkingPlaceID: '',
            parkingAddress: '',
            spotsNumber: ''
        }

    }

    componentDidMount() {

        ParkingService.getParkingPlacesOfAMunicipality().then((response) => {
            this.setState({ parkingplaces: response.data })
        });

    }

    handleSubmit = (event) => {
        alert('changing parking place with ID: ' + this.state.parkingPlaceID + ' with values: ' + this.state.parkingAddress + ' and ' + this.state.spotsNumber);

        ParkingService.parkingPlaceModification(this.state.parkingPlaceID,  this.state.spotsNumber ,this.state.parkingAddress).then(response => {

            console.log("response", response.status);

            if (response.status === 200)
                alert("Success!");
            else
                alert("Something went wrong, response code: " + response.status);

        })
        event.preventDefault();
    }

    parkingPlaceChange = (event) => {
        var parkingInfo = event.target.value.split(" , ");
        var ID = parkingInfo[0];
        var Address = parkingInfo[1];
        var Spots = parkingInfo[2];
        this.setState({ parkingPlaceID: ID, parkingAddress: Address, spotsNumber: Spots });
    }

    spotsNumberChange = (event) => {
        this.setState({ spotsNumber: event.target.value });
    }

    addressChange = (event) => {
        this.setState({ parkingAddress: event.target.value });
    }


    render() {
        return (
            <div className="sfondo">
                <div class="form-body">
                    <div class="row">
                        <div class="form-holder">
                            <div class="form-content">
                                <div class="form-items">
                                    <h3>Parking Place modification</h3>
                                    <p></p>
                                    <form onSubmit={this.handleSubmit}>
                                        <div class="col-md-12">
                                        <h5>Select a parking place</h5>
                                            <select class="form-select mt-6" defaultValue='parking address' onChange={this.parkingPlaceChange}>
                                                <option > ID, SPOTS NUMBER, ADDRESS</option>
                                                {
                                                    this.state.parkingplaces.map(
                                                        parkingplace =>
                                                            <option >{parkingplace.parkingPlaceID} , {parkingplace.spotsNumber} , {parkingplace.address}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <br></br>
                                        <div class="col-md-12">
                                            <h5>New address</h5>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="mt-6">

                                                <input className="form-control"
                                                    type='text'
                                                    onChange={this.addressChange}
                                                />
                                            </div>
                                        </div>
                                        <br></br>
                                        <div class="col-md-12">
                                            <h5>new Spots Number</h5>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="mt-6">
                                                <input className="form-control"
                                                    type='number'
                                                    min='1'
                                                    onChange={this.spotsNumberChange}
                                                />
                                            </div>
                                        </div>
                                        <br></br>
                                        <div class="form-button mt-6">
                                            <button id="submit" type="submit" class="btn btn-primary">Modify</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export default ParkingPlaceModificationComponent