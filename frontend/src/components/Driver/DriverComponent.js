import React from 'react';

class DriverComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value : ''
        }
    }

    render(){
        return(
            <h1>Hi Driver!</h1>
        )
    }


}
export default DriverComponent