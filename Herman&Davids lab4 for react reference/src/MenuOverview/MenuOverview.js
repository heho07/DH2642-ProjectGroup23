import React, { Component } from "react";
import modelInstance from "../data/DinnerModel";
import { Link } from "react-router-dom";
import "./MenuOverview.css";


// Renders HTML for an overview of which dishes are chosen. Shows image and name as well as total price
class MenuOverview extends Component{

	// when created the constructor gets the menu from the model
	// No interaction with the data in this view, only needs to be done once when mounting the component!
	constructor(props){
		super(props);
		this.state = {
			menu: modelInstance.getFullMenu(),
		};
	}

	// Creates a div of a dish on the chosen menu
	renderDish(dish){
		return(
			<div>
				<img src = {dish.image} alt = {dish.title}/>
				<p>{dish.title}</p>
				<p>{modelInstance.getPriceOfDish(dish) + " SEK"}</p>
			</div>
		);
	}

	render(){
		return(
			<div>
				<center>
					<div className = "row">
						{this.state.menu.map((item, i) =>{
							return(
								<div className = "col-sm-3" key = {item.id}>
									{this.renderDish(item)}
								</div>
							);
						})}
					</div>
				</center>
				<div className = "row" id = "totPrice">
					<p><b>{"Total price: " + modelInstance.getTotalMenuPrice()}</b></p>
				</div>
				<Link to = "/printout" id = "confirmButton">
					<button>Print full recipe</button>
				</Link>
			</div>
		);
	}

}

export default MenuOverview;