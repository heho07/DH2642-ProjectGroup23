import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";


// See below for examples of how to import components into our app:
// import modelInstance from "./data/DinnerModel";
// import SelectDish from "./SelectDish/SelectDish";
// import Overview from "./Overview/Overview";
// import Printout from "./Printout/Printout";
// import Dish from "./Dish/Dish";
import modelInstance from "./data/Model";
import Welcome from "./Welcome/Welcome";
import SearchScreen from "./SearchScreen/SearchScreen";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Project group 23 DH2642"
    };
  }
  

  // The render function will use Routers to check what URL the user is at and render stuff accordingly
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
            path = "/SearchScreen" 
            render = {() => <SearchScreen model = {modelInstance}/>}
          />
        </header>
      </div>
    );
  }

  

}

export default App;
