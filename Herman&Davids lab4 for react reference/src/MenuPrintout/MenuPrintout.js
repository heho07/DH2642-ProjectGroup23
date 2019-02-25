import React, { Component } from "react";
import modelInstance from "../data/DinnerModel";
import "./MenuPrintout.css";


// Renders the HTML for the printout of the chosen menu
class MenuPrintout extends Component{

	// Everytime this is constructed the component will get the chosen menu from the model. 
	// There is no interaction in this view hence an update function is not required
	constructor(props){
		super(props);
		this.state = {
			menu: modelInstance.getFullMenu(),
		};
	}


	// Renders an HTML row containging information about one dish on the menu

	renderDish(dish){
		let image = dish.image;
		let name = dish.title;
		let instructions = dish.instructions;
		if (instructions == null) {
			instructions = "No instructions available...";
		}
		return(
			<div className = "row">
				<div className = "col-sm-2">
					<img src = {image} alt = {name} className = "printOutImage"/>
				</div>
				<div className = "col-sm-3">
					<h3>{name}</h3>
					<p>Lorem ipsum..</p>
				</div>
				<div className = "col-sm-4">
					<h4>Preparations</h4>
					<p>{instructions}</p>
				</div>
			</div>
		);
	}

	render(){
		return(
			<div>
				{/* iterates through the items on the menu and calls renderDish for each*/}
				{this.state.menu.map((item, i) =>{
					return(
						<div key = {item.id}>
							{this.renderDish(item)} 
						</div>
					);
				})}
			</div>
		);
	}

}

export default MenuPrintout;