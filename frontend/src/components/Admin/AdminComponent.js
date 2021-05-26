import React from 'react';

class AdminComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value : ''
        }
    }

    render(){
        return(
            <h1>Hi Admin!</h1>
        )
    }


}
export default AdminComponent