import React from 'react';
import MunicipalityService from './MunicipalityService';

class MunicipalityComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            spotsnumber: '',
            address: ''
        }
    }

    spotsNumberChange = (event) => {
      this.setState({spotsnumber: event.target.value});
    }

    addressChange = (event) => {
      this.setState({address: event.target.value});
    }

  handleSubmit = (event) => {
    MunicipalityService.newParkingPlace(this.state.spotsnumber,this.state.address).then(response=> console.log("response", response.status))
    event.preventDefault();
  }

render() {
    return ( 
      <form onSubmit={this.handleSubmit}>
        <h1>Spots Number : {this.state.spotsnumber}</h1>
        <input
          type='number'
          min ='1'
          onChange={this.spotsNumberChange}
        />
        <h1>Address : {this.state.address}</h1>
        <input
          type='text'
          onChange={this.addressChange}
        />
        <input type="submit" value="Submit" />
        </form>
    );
  }

}
export default MunicipalityComponent