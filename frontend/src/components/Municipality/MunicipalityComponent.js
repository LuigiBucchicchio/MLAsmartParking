import React from 'react';
import axios from 'axios';
const ADDPLACE_REST_API_URL = "http://localhost:8080/parking-place/add";

class MunicipalityComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            spotsnumber: '',
            address: ''
        }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleChange(event) { 
         this.setState({spotsnumber: event.target.spotsnumber,
        address: event.target.address,});
          }

  handleSubmit(event) {
    axios.post(ADDPLACE_REST_API_URL, {
        spotsNumber: this.state.spotsnumber,
        address: this.state.address
      })
      .then(function (response) {
        console.log(response);
      })
    event.preventDefault();
  }

render() {
    return ( 
      <form onSubmit={this.handleSubmit}>
          <label>
          Spots Number:
           <input type="number" min="1" spotsnumber={this.state.spotsnumber} onChange={this.handleChange} />
          </label>
          <label>
          Address:
           <input type="text" address={this.state.address} onChange={this.handleChange} />
          </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}
export default MunicipalityComponent