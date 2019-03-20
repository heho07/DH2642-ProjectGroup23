import React, { Component } from "react";


import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../DisplaySearchResults/DisplaySearchResults";
import "./SearchScreen.css";


// This screen should probably be split up into several components. Maybe one for the search and one for displaying the results
// They can then communicate with eachother via a parent component which keeps track of their states for easy communication
class SearchScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			filter:"",
		}
	}


	// The HTML to be rendered on the page
	render(){
		return(
			<div>
			<br />
				<SearchBar search = {filter => this.setState({filter:filter})}/>
				{	/* passing the attribute "key" to the component makes it uniquely identifiable
					by React. As such React will notice when the key has changed and re-render the component.
					Essentially this means that the component will be deleted then created anew. */}
				<SearchResults key = {this.state.filter} filter = {this.state.filter}/>
			</div>
		);
	}
}

export default SearchScreen;