import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import SearchBar from "../SearchBar/SearchBar";
import "./SelectDish.css";

// The master component when searching for different dishes
class SelectDish extends Component {

  constructor(props){
    super(props);
    this.state={
      filter:"",
      type:"",
    };
  }


  // This function is called when the form in SearchBar.js is submitted
  // and will change what filter and type is being used in Dishes.js
  handleSearch(filter, type){
    console.log("trying to set state with filter: "+ filter+ " and type: " + type);
    this.setState({
      filter: filter,
      type: type,
    });

  }

  render() {
    return (
      <div className="SelectDish">
         {/* <h2>This is the Select Dish screen</h2> */}
        <center>
        <SearchBar onSearch = {(filter, type)=>this.handleSearch(filter, type)} filter = {this.state.filter} type = {this.state.type} />
        </center>
        <div className = "row">
          <div className = "col-sm-3">
          {/* We pass the model as property to the Sidebar component */}
            <Sidebar model={this.props.model} />
          </div>
          <div className = "col-sm-9">
            <Dishes key = {this.state.filter + this.state.type} filter = {this.state.filter} type = {this.state.type}/>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectDish;
