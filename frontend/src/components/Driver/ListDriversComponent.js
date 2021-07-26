import React from 'react';
import { getDrivers } from './DriverService';

class ListDriversComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drivers: []
        }
    }

    componentDidMount() {
        getDrivers().then((response) => {
            this.setState({ drivers : response.data})
        }); 
      }

    render(){
        return (
               
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
                               this.state.drivers.map( 
                                   driver  =>
                                       <tr key={driver.id}>
                                           <td> {driver.id}</td>
                                           <td> {driver.name}</td>
                                           <td> {driver.surname}</td>
                                           <td> {driver.email}</td>
                                           <td> {driver.phoneNumber}</td>
   
                                       </tr>
                               )
                           }
                       </tbody>
   
                   </table>
   
               </div>
           )
    }


}
export default ListDriversComponent