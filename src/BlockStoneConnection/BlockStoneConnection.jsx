import React, { Component } from "react";
import { Link } from "react-router-dom";

// importing the modelInstance directly (as opposed to passing it as a prop)
// this is easier because it makes the component less dependent on the way it is implemented from its parents.
import modelInstance from "../data/Model";



// Renders HTML for the search results.
// What filter to search for is passed to it from its parent component (this.props.filter)
class BlockStoneConnection extends Component {
  constructor(props) {
    super(props);
  }

 
// The HTML to be rendered on the page
  render(){

    return(
      <div>

      </div>
    );
  }
}



export default BlockStoneConnection;
