import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";


import StoreDetail from "./StoreDetail/StoreDetail";
import MyCollection from "./MyCollection/MyCollection";
import modelInstance from "./data/Model";
import Welcome from "./Welcome/Welcome";
import SearchScreen from "./SearchScreen/SearchScreen";
import VersusMode from "./VersusMode/VersusMode";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "BlockStone"
    };
  }
  

  // The render function will use Routers to check what URL the user is at and render stuff accordingly
  render() {
    return (
        <div className="App">
        <header className="App-header">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
             <Link to ="/"><a className="navbar-brand" href="#">BlockStone</a></Link>
             
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">

              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
              <Link to = "/"> <a ClassName="nav-item nav-link" >Home <span ClassName="sr-only">(current)</span></a></Link>
               <Link to = "/VersusMode"> <a ClassName="nav-item nav-link"> VSmode</a></Link>
               <Link to = "/MyCollection">  <a ClassName="nav-item nav-link">My Collection</a></Link>
               <Link to = "/searchScreen"><a ClassName="nav-item nav-link" href="#">Store</a></Link>
              </div>
            </div>
          </nav>
          
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />   
          
          {/* Search*/}
          <Route 
            path = "/SearchScreen" 
            render = {() => <SearchScreen model = {modelInstance}/>}
          />

          <Route 
            path ="/MyCollection"
            render = { () => <MyCollection/> }
          /> 
        {/* This will be de screen for a specific card, to purchase*/}
          <Route 
            path ="/StoreDetail"
            render = { () => <StoreDetail/> }
          /> 

        {/*A place to try out the vs mode*/}
          <Route
            path = "/VersusMode"
            render = {() => <VersusMode/>}
          />

        </header>
      </div>
    );
  }

  

}

export default App;
