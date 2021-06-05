import React from 'react';
import MunicipalityService from './MunicipalityService';


class ListMunicipalitiesComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          municipalities: []
        }
      }

      componentDidMount() {
        MunicipalityService.getMunicipalities().then((response) => {
            this.setState({ municipalities : response.data})
        }); 
      }

    render() {
      return (
               
        <div className= "container">
               <table className="table table-hover table-dark">
                   <thead>
                       <tr>
                           <th scope="col">Municipality ID</th>
                           <th scope="col">Municipality Name</th>
                           <th scope="col">Municipality email</th>
                           <th scope="col">Municipality Username</th>
                           <th scope="col">Municipality Phone Number</th>
                       </tr>
                   </thead>
                   <tbody>
                       {
                           this.state.municipalities.map( 
                               municipality  =>
                                   <tr key={municipality.id}>
                                       <td> {municipality.id}</td>
                                       <td> {municipality.name}</td>
                                       <td> {municipality.email}</td>
                                       <td> {municipality.username}</td>
                                       <td> {municipality.phoneNumber}</td>

                                   </tr>
                           )
                       }
                   </tbody>

               </table>

           </div>
       )
    }

}

export default ListMunicipalitiesComponent