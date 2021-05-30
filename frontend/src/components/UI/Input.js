import React from "react";

class Input extends React.Component {
  
    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="Input">
          <label for="input1"></label>
          <input
            id="input1" 
            type={this.props.type} 
            name={this.props.name}
            placeholder={this.props.placeholder}
            autocomplete="false"
            required
          />
        </div>
      )
    }
  }

  export default Input;