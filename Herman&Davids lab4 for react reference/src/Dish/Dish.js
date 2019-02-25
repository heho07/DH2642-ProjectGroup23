import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import DishDetails from "../DishDetails/DishDetails";
import queryString from 'query-string';
import modelInstance from "../data/DinnerModel";


// Master component for showing information about a specific dish
class Dish extends Component{


	// The constructor checks the URL for the relevant dishID and the component later passes this on to DishDetails
	constructor (props){
		super(props);
		let url = this.props.location.search;
		let params = queryString.parse(url);
		this.state = {
			id:params.id,
		}
	}



	render(){
		return (
			<div>
				<div className = "row">
					<div className = "col-sm-3">
						<Sidebar model={modelInstance} />
					</div>
					<div className = "col-sm-9">
						<DishDetails key = {this.state.id} id = {this.state.id}/>
					</div>
				</div>
			</div>
		);
	}
}

export default Dish;