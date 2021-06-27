import React from 'react';
import PolicemanService from './PolicemanService';
import './AssignPoliceman.css';


class UnassignPolicemanComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      policemen: [],
      policemanName: ''
    }

  }

  componentDidMount() {
    PolicemanService.getPolicemenOfAMunicipality().then((response) => {
        this.setState({ policemen : response.data})
    });
  }

  handleSubmit= (event) => {
    alert('Dismiss : ' + this.state.policemanName);
      PolicemanService.unassignPoliceman(this.state.policemanName).then(response => {

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
                        <select class="form-select mt-6" defaultValue='policeman name' onChange={this.policemanChange}>
                        <option >select an option</option>
                        {
                           this.state.policemen.map( 
                               policeman  =>
                                    <option >{policeman.name} , {policeman.surname}</option>
                           )
                       }
                       </select>
                   </div>
                   
                    <div class="form-button mt-6">
                        <button id="submit" type="submit" class="btn btn-primary">Unassign</button>
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

export default UnassignPolicemanComponent