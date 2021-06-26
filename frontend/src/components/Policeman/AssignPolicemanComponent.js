import React from 'react';
import PolicemanService from './PolicemanService';
import ParkingService from '../Parking/ParkingService';
import './AssignPoliceman.css';


class AssignPolicemanComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      policemen: [],
      parkingplaces: [],
      policemanName: '',
      parkingAddress: ''
    }

  }

  componentDidMount() {
    PolicemanService.getPolicemenOfAMunicipality().then((response) => {
        this.setState({ policemen : response.data})
    }); 
    ParkingService.getParkingPlacesOfAMunicipality().then((response) => {
      this.setState({ parkingplaces : response.data})
  });
  }

  handleSubmit= (event) => {
    alert('Vuoi assegnare: ' + this.state.policemanName + ' in '+ this.state.parkingAddress);
      PolicemanService.assignPoliceman(this.state.policemanName,this.state.parkingAddress).then(response => {

      console.log("response", response.status);

      if(response.status === 200)
      alert("Success!");
      else
      alert("Something went wrong, response code: " + response.status);

    })
    event.preventDefault();
  }

  policemanChange = (event) => {
    var nameSurname = event.target.value.split(" , ");
    var name = nameSurname[0];
    this.setState({policemanName:name});
  }

  addressChange = (event) => {
    this.setState({ parkingAddress: event.target.value});
  }


render() {
  return (
<div className="sfondo">
<div class="form-body">
<div class="row">
    <div class="form-holder">
        <div class="form-content">
            <div class="form-items">
                <h3>Assign Policeman</h3>
                <p></p>
                <form onSubmit={this.handleSubmit}>
                   <div class="col-md-12">
                        <select class="form-select mt-4" defaultValue='policeman name' onChange={this.policemanChange}>
                        {
                           this.state.policemen.map( 
                               policeman  =>
                                    <option >{policeman.name} , {policeman.surname}</option>
                           )
                       }
                       </select>
                   </div>

                   <div class="col-md-12">
                        <select class="form-select mt-4" defaultValue='parking address' onChange={this.addressChange}>
                        {
                            this.state.parkingplaces.map( 
                                parkingplace  =>
                                <option >{parkingplace.address}</option>
                            )
                        }
                       </select>
                   </div>
                   
                    <div class="form-button mt-4">
                        <button id="submit" type="submit" class="btn btn-primary">Assign</button>
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

export default AssignPolicemanComponent