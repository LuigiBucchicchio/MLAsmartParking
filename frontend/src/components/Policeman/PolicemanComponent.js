import React from 'react';
import PolicemanService from './PolicemanService';
import {Form, Button} from 'react-bootstrap';

class PolicemanComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            policeman : '',
            plate : '',
            reservations : [],
        }
    }

    getReservationDuration = (endingTime) => {
        const sTime = new Date();
        const eTime = new Date(endingTime);
    
        const durationInMillis = eTime.getTime() - sTime.getTime();
    
        //Hour 3600000
        const hours = Math.floor(Math.round(durationInMillis / 3600000));
        // minute 60000
        const minutes = Math.floor(
          Math.round((durationInMillis % 3600000) / 60000)
        );
    
        // data to print
        if (hours === 0) {
          return `${minutes}m`;
        } else {
          return `${hours}h ${minutes}m`;
        }
      };

    componentDidMount() {
        PolicemanService.getPolicemanProfile().then((response) => {
            this.setState({ policeman : response.data})
        }); 
      }

      plateChange = (event) => {
        this.setState({plate : event.target.value});
      }

      handleSubmit= (event) => {
          PolicemanService.reservationsPlacePlate(this.state.policeman.assignedParkingPlace.address,this.state.plate).then(response => {
    
          console.log("response", response.status);
    
          if(response.status === 200){
              this.setState({reservations : response.data});
          }
          else
          alert("Something went wrong, response code: " + response.status);


    
        })
        event.preventDefault();
      }


    render(){
        if(this.state.policeman.assignedParkingPlace === undefined || this.state.policeman.assignedParkingPlace === null ){
            return(
                <div className= "container">
                    <br></br>
                    <h2>You are currently not assigned</h2>
                    <br></br>
                       <table className="table table-hover table-dark">
                           <thead>
                               <tr>
                                   <th scope="col">Your ID</th>
                                   <th scope="col">Your Name</th>
                                   <th scope="col">Your Surname</th>
                                   <th scope="col">Your Email</th>
                                   <th scope="col">Your Phone number</th>
                               </tr>
                           </thead>
                           <tbody>
                               {
                                           <tr>
                                               <td> {this.state.policeman.id}</td>
                                               <td> {this.state.policeman.name}</td>
                                               <td> {this.state.policeman.surname}</td>
                                               <td> {this.state.policeman.email}</td>
                                               <td> {this.state.policeman.phoneNumber}</td>
                                           </tr>
                               }
                           </tbody>
       
                       </table>
       
                   </div>
               )
        }else{
            return(
                <div>
                <div className= "container">
                    <br></br>
                    <h2>You are assigned at the parking place: {this.state.policeman.assignedParkingPlace.address}, {this.state.policeman.municipality.name} </h2>
                    <br></br>
                       <table className="table table-hover table-dark">
                           <thead>
                               <tr>
                                   <th scope="col">Your ID</th>
                                   <th scope="col">Your Name</th>
                                   <th scope="col">Your Surname</th>
                                   <th scope="col">Your Email</th>
                                   <th scope="col">Your Phone number</th>
                               </tr>
                           </thead>
                           <tbody>
                               {
                                           <tr>
                                               <td> {this.state.policeman.id}</td>
                                               <td> {this.state.policeman.name}</td>
                                               <td> {this.state.policeman.surname}</td>
                                               <td> {this.state.policeman.email}</td>
                                               <td> {this.state.policeman.phoneNumber}</td>
                                           </tr>
                               }
                           </tbody>
       
                       </table>
       
                   </div>
                   <div className="container">
                   <Form onSubmit={this.handleSubmit}>
  <Form.Group className="mb-3" controlId="formGridAddress1" onChange={this.plateChange}>
    <Form.Label>Search a Car Plate</Form.Label>
    <Form.Control placeholder="car plate" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Search
  </Button>
</Form>
                   </div>
                    <div className= "container">
                    <table className="table table-hover table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Reservation ID</th>
                                <th scope="col">Reservation Starting Time</th>
                                <th scope="col">Reservation Ending Time</th>
                                <th scope="col">Time Remaining</th>
                                <th scope="col">Reservation Spot progressive Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.reservations.map( 
                                    reservation  =>
                                        <tr key={reservation.id}>
                                            <td> {reservation.id}</td>
                                            <td> {reservation.startingTime}</td>
                                            <td> {reservation.endingTime}</td>
                                            <td> {this.getReservationDuration(reservation.endingTime)}</td>
                                            <td> {reservation.parkingSpot.progressiveNumber}</td>
     
                                        </tr>
                                )
                            }
                        </tbody>
     
                    </table>
     
                </div>
                </div>
               )
 }
        
    }


}
export default PolicemanComponent