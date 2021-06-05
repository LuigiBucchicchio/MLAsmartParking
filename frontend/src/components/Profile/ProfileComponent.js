import React from 'react';


class ProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          value : ''
        }
      }

    componentDidMount() {
        
      }

    render() {
        return (
               <div>
                   <h1>HI</h1>
               </div>
        )
    }

}

export default ProfileComponent