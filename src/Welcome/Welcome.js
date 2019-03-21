import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <br/>
        <center>
          <div className = "row">
            <div className = "col-sm-4 teststyle">
              <center>Add image here</center>
              <center>

              <p className ="imageParagraph">Image should be clickable</p>
              </center>
              <br />
              <h4>
              <center>
              <Link to="/MyCollection">
                <button type="button" className="btn btn-dark">My Collection</button>

              </Link>
              </center>
              </h4>
            </div> 
            <div className = "col-sm-4 teststyle">
              <center>Add image here</center>
              <center>
              <p className ="imageParagraph"> Image should be clickable</p>
              </center>
              <br />            
              <h4><center> 
              <Link to = "/VersusMode">
                <button type="button" className="btn btn-dark">VS mode</button>
               </Link>
              </center></h4>
            </div> 
            <div className = "col-sm-4 teststyle">
              <center>Add image here</center>
              <center>
              <p className ="imageParagraph"> Image should be clickable</p>
              </center>
              <br />
              <h4><center>
              <Link to="/SearchScreen">
                <button type="button" className="btn btn-dark">Store</button>
              </Link>
              </center></h4>
            </div> 
          </div>
          <br />
          <br />
          <br />

        </center>
      </div>
    );
  }
}

export default Welcome;
