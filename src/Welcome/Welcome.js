import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <br/>
        <center>
          <p>This is the start screen for our project</p>

          <Link to="/SearchScreen">
            <button>This button can link us to the next view</button>
          </Link>
        </center>
      </div>
    );
  }
}

export default Welcome;
