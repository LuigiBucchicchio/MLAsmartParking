import React from 'react';
import '../Layout/Cards.css';
import DriverService from './DriverService';

class DriverProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            driver : ''
        }
    }

    componentDidMount() {
        DriverService.getProfile().then((response) => {
            this.setState({ driver : response.data})
        }); 
      }

    render(){
        return(
               
            <div className= "container">
                   <table className="table table-hover table-dark">
                       <thead>
                           <tr>
                               <th scope="col">Driver ID</th>
                               <th scope="col">Driver Name</th>
                               <th scope="col">Driver Surname</th>
                               <th scope="col">Driver Email</th>
                               <th scope="col">Driver Phone number</th>
                           </tr>
                       </thead>
                       <tbody>
                           {
                                       <tr>
                                           <td> {this.state.driver.id}</td>
                                           <td> {this.state.driver.name}</td>
                                           <td> {this.state.driver.surname}</td>
                                           <td> {this.state.driver.email}</td>
                                           <td> {this.state.driver.phoneNumber}</td>
                                       </tr>
                           }
                       </tbody>
   
                   </table>
   
               </div>
           )
    }


}
export default DriverProfileComponent