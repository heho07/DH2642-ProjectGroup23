import React, { Component } from "react";
import { Link } from "react-router-dom";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./Dishes.css";


// Renders HTML for the search results
class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING"
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render

    // MODIFIED: We pass an optional filter and a type as parameter for getAllDishes 
    modelInstance
      .getAllDishes(this.props.filter, this.props.type)
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes.results
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  

  renderImage(dish){
    return(
        <div key={dish.id} className = 'col-sm-3'>
          <Link to={"/dish?id="+dish.id}>
            <img src = {'https://spoonacular.com/recipeImages/' + dish.image} alt = {dish.title}/>
            <div className = 'dishName'>{dish.title}</div>
          </Link>
        </div>
    );
  }

  render() {
    let dishesList = null;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
      case "LOADED":
          dishesList = this.state.dishes.map(dish => (
            this.renderImage(dish)
          ));
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Dishes">
        <h3>Dishes</h3>
        <div className = "row">{dishesList}</div>
      </div>
    );
  }
}



export default Dishes;
