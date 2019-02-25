import React, { Component } from "react";
import modelInstance from "../data/DinnerModel";
import "./DinnerDoneHeader.css";
import { Link } from "react-router-dom";


class DinnerDoneHeader extends Component{
	constructor(props){
		super(props);
		this.state={
			numberOfGuest:modelInstance.getNumberOfGuests(),
		}
	}

	render(){
		return(
			<div className = "row" id = "dinnerDoneHeaderBar">
				<div className = "sm-col-8 dinnerDoneHeaderBar">
					<h3>{"My dinner: " + this.state.numberOfGuest + " people"}</h3>
				</div>
				<div className = "sm-col-3 dinnerDoneHeaderBar">
					<Link to = "/search">
						<button>Go back and edit dinner</button>
					</Link>
				</div>
			</div>
			);
	}

}
export default DinnerDoneHeader;