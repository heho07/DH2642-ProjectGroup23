import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";


class Welcome extends Component {
  
    render() {
    return (
      // Creates all the options at the initial menu. 
      // Both images and buttons link to same destination. 
      <div className="Welcome">
        <br/>
        <center>
          <div className = "row">

            {/* Options to get to my collection, needs to be populated by the user */}

            <div className = "col-sm-4 teststyle">
              
              <center>
              <Link to="/MyCollection">
                <img className="imageOptionCollection" src={require('./collection_small.png')} alt ="collection_small.png" />
              </Link>
              </center>
              <br />
              <p className ="imageParagraph">Check your cards</p>
            
              <h4>
              <center>
              <Link to="/MyCollection">
                <button type="button" className="btn btn-dark">My Collection</button>

              </Link>
              </center>
              </h4>
            </div>

            {/* Options to get to the Versus-mode */} 

            <div className = "col-sm-4 teststyle">
              <center>
              <Link to = "/ChooseDifficulty">
                <img className="imageOptionVersus" src={require('./versus_small.png')} alt ="versus_small.png"/>
              </Link>
              </center>
              <center>
              <br/>
              <p className ="imageParagraph"> Battle other cards</p>
              </center>
                         
              <h4><center> 
              <Link to = "/ChooseDifficulty">
                <button type="button" className="btn btn-dark">VS mode</button>
               </Link>
              </center></h4>
            </div> 

            {/* Options to transfer users to the store */} 

            <div className = "col-sm-4 teststyle">
              <center>
              <Link to="/SearchScreen">
                <img className="imageOptionCoins" src={require('./coins_small.png')} alt ="coins_small.png" />
              </Link>
              </center>
              <center>
              <br/>
              <p className ="imageParagraph"> Buy new cards</p>
              </center>
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
