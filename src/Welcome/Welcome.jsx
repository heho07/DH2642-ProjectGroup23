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
              
              <center>
              <img className="imageOptionCollection" src={require('./collection_small.png')} />
            
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
            <div className = "col-sm-4 teststyle">
              <center>
                <img className="imageOptionVersus" src={require('./versus_small.png')} />
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
            <div className = "col-sm-4 teststyle">
              <center>
                <img className="imageOptionCoins" src={require('./coins_small.png')} />
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
