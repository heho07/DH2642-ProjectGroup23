import React, { Component } from "react";
import modelInstance from "../data/Model";
import "./SearchBar.css";

// this component basically renders a searchbar which will pass the inputted information to its parent component
// when the search is submitted.
class SearchBar extends Component{

	// SearchBar "loacally" keeps track of what the user has entered into the form via it's state
	constructor(props){
		super (props);
		 this.state = {
			 filter: modelInstance.getFilter(),
			 isOpen: false,
		 };
	}


	// If a change is detected in the input field the components state is changed accordingly
	handleChangeOfInput(event){
		this.setState({
			filter: event.target.value,
		});
	}



	// When the <form> is submitted this function will prevent
	// the website from redirecting itself and call the  function
	// provided by its parent component (search() from SearchScreen)

	// Needs the prop scope to function
	handleSubmit (event){
		event.preventDefault();
		if (modelInstance.getFilter() === this.state.filter) {   // if the new filter is the same as the old one we don't need to do a new search
			  console.log("samma lolll");
		}
	   else{   // if there is a new search filter we clear the previous search results from the model
			modelInstance.clearSearchedCards();
			modelInstance.setFilter(this.state.filter);
        }
					
	}

	ascendingDescending(){
		this.props.ascendingDescending();

	}

	changeSortingType(type){
		this.props.changeSortingType(type);
	}

	toggleOpen = () => this.setState({
		 isOpen: !this.state.isOpen 
		});


	render(){
		//Generates the search field and lets the user change sorting options.
		// Needs to be updated with pointers. 
		return(
			<center>
			<div className="row">
				<div className="header col-sm-12 searchbar view" id="searchBar">
					<form onSubmit = {(event) => this.handleSubmit(event)} >
						<input id = "filter" type = "text" value = {this.state.filter} onChange = {(event) => this.handleChangeOfInput(event)}/>
						<input type = "submit" className="form-control"></input>				
					</form>
					
					<p className="sortOption" onClick = {() => this.ascendingDescending()}>Ascending/Descending</p>
					<p className="sortOption" onClick = {() => this.changeSortingType("name")}>Sort by name</p>
					<p className="sortOption" onClick = {() => this.changeSortingType("health")}>Sort by health</p>
					<p className="sortOption" onClick = {() => this.changeSortingType("attack")}>Sort by attack</p>					
					
				
				
					</div>
				</div>
		
		</center>
		);
	}
}
export default SearchBar;