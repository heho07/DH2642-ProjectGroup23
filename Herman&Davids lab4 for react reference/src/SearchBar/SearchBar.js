import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component{

	// SearchBar "loacally" keeps track of what the user has entered into the form via it's state
	constructor(props){
		super (props);
		 this.state = {
		 	filter: "",
		 	type: "",
		 };
	}


	// When the user input changes this function will change the state accordingly
	handleChange(event, stateToChange){
		if (stateToChange === "filter") {
			this.setState({filter: event.target.value});
		}
		if (stateToChange === "type") {
			this.setState({type: event.target.value});
		}
	}



	// When the <form> is submitted this function will prevent
	// the website from redirecting itself and call the onClick function
	// from SelectDish.js

	// Needs the prop scope to function
	handleSubmit (event, filter, type){
		event.preventDefault();
		this.props.onSearch(filter, type); 		// the onSearch attribute in selecDish.js (aka the handleSearch function in selectDish.js)
	}

	render(){
		return(
			<div className="row">
				<div className="header col-sm-12 searchbar view" id="searchBar">
					<form onSubmit = {(e) => this.handleSubmit(e, this.state.filter, this.state.type)}>
						<input id = "filter" type = "text" value = {this.state.filter} onChange = {e => this.handleChange(e, "filter")}/>		
						<select name = "foodType" id = "type" value = {this.state.type} onChange = {e => this.handleChange(e, "type")}>
							<option value = "">all</option>
							<option value = "appetizer">appetizer</option>
							<option value = "main course">main course</option>
							<option value = "dessert">dessert</option>
							<option value = "side dish">side dish</option>
							<option value = "salad">salad</option>
							<option value = "bread">bread</option>
							<option value = "breakfast">breakfast</option>
							<option value = "soup">soup</option>
							<option value = "beverage">beverage</option>
							<option value = "sauce">sauce</option>
							<option value = "drink">drink</option>
						</select>
						<input id = "searchButton" type = "submit"/>
					</form>
				</div>
			</div>
		);
	}
}
export default SearchBar;