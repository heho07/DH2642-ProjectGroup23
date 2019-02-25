import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import Overview from "./Overview/Overview";
import Printout from "./Printout/Printout";
import Dish from "./Dish/Dish";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }
  
  // Checks the URL for which components to render
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="dinnerPlannerHeader">
            <h1 className="App-title">{this.state.title}</h1>
          </div>
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route
            path="/search"
            render={() => <SelectDish model={modelInstance} />}
          />
          <Route 
            path = "/dish"
            component = {Dish}
          />    
          <Route
            path = "/overview"
            render= { () => <Overview/> }  
          /> 
          <Route 
            path ="/printout"
            render = { () => <Printout/> }
          />   
        </header>
      </div>
    );
  }

}

export default App;
