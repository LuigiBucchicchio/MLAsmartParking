import React from 'react';
import PolicemanService from './PolicemanService';

class PolicemanComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            policeman : ''
        }
    }

    componentDidMount() {
        PolicemanService.getPolicemanProfile().then((response) => {
            this.setState({ policeman : response.data})
        }); 
      }

    render(){
       
        var text;
        if(this.state.policeman.assignedParkingPlace === undefined || this.state.policeman.assignedParkingPlace === null )
             text= "you are currently not assigned";
        else
        text= "you are assigned at the parking place: " + this.state.policeman.assignedParkingPlace; 
 
        return(
            <div className= "container">
                <h1>{text}</h1>
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
    }


}
export default PolicemanComponent