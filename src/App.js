import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";

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
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">BlockStone</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-item nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link" href="/MyCollection">MyCollection</a>
                <a class="nav-item nav-link" href="#">Store</a>
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
