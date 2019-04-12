import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";


import StoreDetail from "./StoreDetail/StoreDetail";
import MyCollection from "./MyCollection/MyCollection";
// import modelInstance from "./data/Model";
import Welcome from "./Welcome/Welcome";
import SearchScreen from "./SearchScreen/SearchScreen";
import VersusMode from "./VersusMode/VersusMode";
import ChooseDifficulty from "./VersusMode/ChooseDifficulty";
import BlockStoneConnection from "./BlockStoneConnection/BlockStoneConnection";
import PopUp from "./VersusMode/PopUp";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "BlockStone"
    };
  }
  

  // The render function will use Routers to check what URL the user is at and render stuff accordingly
  // Currently Hamburger menu is not working. 
  // Might have to change menu. 
  render() {
    return (
        <div className="App">
          <header className="App-header">

           <nav className="navbar navbar-expand-lg navbar-light bg-light">
             <Link to ="/" className="navbar-brand" >BlockStone</Link>
             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
              <Link to = "/" className = "nav-item nav-link"> Home <span className="sr-only">(current)</span></Link>
               <Link to = "/ChooseDifficulty" className="nav-item nav-link"> VSmode</Link>
               <Link to = "/MyCollection" className="nav-item nav-link">My Collection</Link>
               <Link to = "/searchScreen" className="nav-item nav-link">Store</Link>
              </div>
            </div>
          </nav>
          <BlockStoneConnection/>
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />   
          
          {/* Search*/}
          <Route 
            path = "/SearchScreen" 
            component = {SearchScreen}
          />

          <Route 
            path ="/MyCollection"
            component = {MyCollection}
          /> 
        {/* This will be de screen for a specific card, to purchase*/}
          <Route 
            path ="/StoreDetail"
            component = {StoreDetail}
          /> 

        {/*A place to try out the vs mode*/}
          <Route
            path = "/ChooseDifficulty"
            component = {ChooseDifficulty}
          />


          <Route
            path = "/VersusMode"
            component = {VersusMode}
          />
          <Route
            path ="/PopUp"
            component = {PopUp}
          />

        </header>
      </div>
    );
  }

  

}

export default App;
