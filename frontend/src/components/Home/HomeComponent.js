import React from "react";
import Map from "../Layout/Map";
import "./Home.css";
const HomeComponent = (props) => {
  // const role = () => {
  //     if (props.role = )
  // };

  return (
    <div className="container">
      <Map />
      {/* {role} */}
    </div>
  );
};

    constructor(props) {
        super(props);
        this.state = {
            value : ''
        }
    }

    render(){
        return(
            <>
            <div className= "container">
            <Map />
            </div>
            </>
            
        )
    }


}
export default HomeComponent