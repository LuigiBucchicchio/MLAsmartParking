import React from 'react';
import ParkingService from './ParkingService';
import './Parking.css'

class AddParkingPlaceComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      spotsnumber: '',
      address: ''
    }
  }

  spotsNumberChange = (event) => {
    this.setState({ spotsnumber: event.target.value });
  }

  addressChange = (event) => {
    this.setState({ address: event.target.value });
  }

  handleSubmit = (event) => {
    ParkingService.newParkingPlace(this.state.spotsnumber, this.state.address).then(response => {
      console.log("response", response.status);
      if(response.status==200)
      alert("Success!");
      else
      alert("Something went wrong, response code: "+response.status);
    })
    event.preventDefault();
  }

  render() {
    return (
      <>

        <div className="d-flex justify-content-center align-items-center container">
          <div className="card py-5 px-3">
            <form onSubmit={this.handleSubmit}>
              <h5 className="title">Add new Parking Place</h5>
              <br />
                <div className="row mt-2" >
                  <div className="col-sm-8">
                    <h5 className="subtitle">Address</h5>
                  </div>
                  <div className="col-sm-4">
                    <h5 className="subtitle">Spots Number</h5>
                  </div>
                </div>

                <div className="row mt-2">
                <div className="col-sm-8">
                  <input className="form-control"
                  type='text'
                  onChange={this.addressChange}
                />
                  </div>
                  <div className="col-sm-4">
                  <input className="form-control"
                  type='number'
                  min='1'
                  onChange={this.spotsNumberChange}
                />
                  </div>
                </div>
              <div className="text-center mt-5" >
                <button type="submit" className="btn btn-primary"> Submit</button>
              </div>
            </form>
          </div>
        </div>

      </>
    );
  }

}
export default AddParkingPlaceComponent