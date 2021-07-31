import React from 'react';
import PolicemanService from './PolicemanService';
import {Link} from 'react-router-dom';
import './listPolicemen.css';

class ListPolicemenComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          policemen: []
        }
      }

      componentDidMount() {
        PolicemanService.getPolicemenOfAMunicipality().then((response) => {
            this.setState({ policemen : response.data})
        }).catch(err => (console.log(err))); 
      }

    render() {
        
      return (
               
        <div className= "container">
          <table className="table table-hover table-dark">
                   <thead>
                       <tr>
                           <th scope="col">Your Policemen</th>
                       </tr>
                   </thead>
                   <tbody>
                   </tbody>
               </table>
               <table className="table table-hover table-dark">
                   <thead>
                       <tr>
                           <th scope="col">Policeman ID</th>
                           <th scope="col">Policeman Name</th>
                           <th scope="col">Policeman Surname</th>
                           <th scope="col">Policeman Email</th>
                           <th scope="col">Policeman PhoneNumber</th>
                           <th scope="col">Assigned Parking Place</th>
                       </tr>
                   </thead>
                   <tbody>
                       {
                           this.state.policemen.map( 
                               policeman  =>
                                   <tr key={policeman.id}>
                                     <td> {policeman.id}</td>
                                       <td> {policeman.name}</td>
                                       <td> {policeman.surname}</td>
                                       <td> {policeman.email}</td>
                                       <td> {policeman.phoneNumber}</td>
                                       <td>
                                       { policeman.assignedParkingPlace!==null ? (policeman.assignedParkingPlace.address && 
                                       <div><p>{policeman.assignedParkingPlace.address}</p><Link to="/unassignPoliceman"><unassignbutton><hover></hover></unassignbutton></Link></div>)
                                        : <Link to="/assignPoliceman"><assignbutton><hover></hover></assignbutton></Link>}
                                   </td>
                                   </tr>
                           )
                       }
                   </tbody>

               </table>

           </div>
       )
    }

}

export default ListPolicemenComponent