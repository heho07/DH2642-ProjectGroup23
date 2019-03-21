import React, { Component } from "react";


// this component basically renders a searchbar which will pass the inputted information to its parent component
// when the search is submitted.
class SearchBar extends Component{

	// SearchBar "loacally" keeps track of what the user has entered into the form via it's state
	constructor(props){
		super (props);
		 this.state = {
		 	filter: "",
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
		this.props.search(this.state.filter); 		
	}

	render(){
		return(
			<center>
			<div className="row">
				<div className="header col-sm-12 searchbar view" id="searchBar">
					<form onSubmit = {(event) => this.handleSubmit(event)} >
						<input id = "filter" type = "text" value = {this.state.filter} onChange = {(event) => this.handleChangeOfInput(event)}/>
						<input type = "submit"></input>
					</form>
				</div>
			</div>
		</center>
		);
	}
}
export default SearchBar;