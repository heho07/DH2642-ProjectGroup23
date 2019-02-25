import React, { Component } from "react";
import "./DishDetails.css";
import { Link } from "react-router-dom";

import modelInstance from "../data/DinnerModel";


// Renders information about a specific dish
class DishDetails extends Component{
	// When created the id will be passed from Dish.js, which is the "master component" for this view
	constructor(props) {
		super(props);
	    // We create the state to store the various statuses
	    // e.g. API data loading or error
	    this.state = {
	    	status: "LOADING",
	    	id: this.props.id,
	    	dish: null,
	    	numberOfGuest: modelInstance.getNumberOfGuests(),
	    };
	}



	// this is called when component is removed from the DOM
	// good place to remove observer
	componentWillUnmount() {
	    modelInstance.removeObserver(this);
	}


	componentDidMount() {
	    // when data is retrieved we update the state
	    // this will cause the component to re-render
    	modelInstance.addObserver(this);
	    // We pass an optional filter and a type as parameter for getAllDishes 
	    modelInstance
	    .getDish(this.state.id)
	    .then(dish => {
	    	this.setState({
	    		status: "LOADED",
	    		dish: dish
	    	});
	    })
	    .catch(() => {
	    	this.setState({
	    		status: "ERROR"
	    	});
	    });
	}


	// Handles user input click on the add-dish-to-menu button
	handleClick(dish){
		modelInstance.addDishToMenu(dish);
	}

	createInformation(dish){
	// Handling the dish information
		let name = dish.title;
		let image = dish.image;
		let instructions = dish.instructions;
		if (instructions == null) {
			instructions = "No instructions available...";
		}

		return( <div>
					<h2>{name}</h2>
					<img src={image} alt = "this is dish"/><br/>
					<p className='textPreperation'>{instructions}</p>
					<Link to ="/search">
						<button className='btn btn-outline-success my-2 my-sm-0' id='backButton' type='submit'> Back to search </button> <br/><br/>
					</Link>
				</div>
		);

	}

	createIngredients(dish){
		// Handling the ingredients 
		var ingredientsList = dish.extendedIngredients;
		let dishPrice = ingredientsList.length * this.state.numberOfGuest;
		let currency = "SEK";

		return ( 
			<div> 
				<h2>Ingredients for {this.state.numberOfGuest} people </h2> 
				<table>
					<tbody>
					{ingredientsList.map((item, i) =>{
						return(
							<tr key = {i}>
								<td>{item.amount*this.state.numberOfGuest + " " + item.unit}</td>
								<td>{item.name}</td>
								<td>{currency}</td>
								<td>{this.state.numberOfGuest}</td>
							</tr>
							);
						})
					}
					</tbody>
				</table>
				<button className='btn btn-outline-success my-2 my-sm-0' id='addButton' type='submit' key = {dish.id} value = {dish} onClick = {()=> this.handleClick(dish)}> Add to menu </button> SEK {dishPrice} <br/><br/>
				
			</div>
		);
		
	}

	// When DinnerModel.notifyObservers() is called this function will in turn be called and change the state
	// containing numberOfGuests which makes react update the effected components
	update(){
		this.setState({
			numberOfGuest: modelInstance.getNumberOfGuests(),
		});
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
	    	dishesList = (
	    		<div className = "row">
	    			<div className = "col-sm-5">
	    				{this.createInformation(this.state.dish)}
	    			</div>
	    			<div className = "col-sm-6">
	    				{this.createIngredients(this.state.dish)}
	    			</div>
				</div>
	    		);

	    	break;
	    	default:
	    	dishesList = <b>Failed to load data, please try again</b>;
	    	break;
	    }

	    return (
	    	<div>
	    	{dishesList}
	    	</div>
	    	);
		}

}

export default DishDetails;	