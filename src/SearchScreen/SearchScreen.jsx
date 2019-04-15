import React, { Component } from "react";
import modelInstance from "../data/Model";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../DisplaySearchResults/DisplaySearchResults";
import "./SearchScreen.css";



// This screen should probably be split up into several components. Maybe one for the search and one for displaying the results
// They can then communicate with eachother via a parent component which keeps track of their states for easy communication
class SearchScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			filter:modelInstance.getFilter(),
			field: "name",
      		reverseSort: false,
      		searchResult: modelInstance.getSearchedCards(),
		}
	}

	componentWillMount(){
		modelInstance.addObserver(this);
	}

	componentWillUnmount(){
    	modelInstance.removeObserver(this);
	}

	update(){
		this.setState({
			filter:modelInstance.getFilter(),
			searchResult : modelInstance.getSearchedCards(),
		});
	}

	// tells the JS sort function what to sort on
	sortCard(primer){
    // reverse indicates what order we're sorting in.
    // Primer indicates how the sort is made. Has to be a way of sorting such as parseFloat etc
    // Field indicates what we're sorting by 
    	console.log("calling sortCard");
	    let key = primer ? x => {return primer(x[this.state.field])} : x => x[this.state.field];
	    let reverse;
	    !(this.state.reverseSort) ? reverse = 1: reverse = -1;
	    return (a,b) =>{
	      return a = key(a), b = key(b), reverse * ((a>b)-(b>a));
	    }
	  }

	  // checks if we want to sort on a number or a string, then calls this.sortCard with the appropriate parameters 
	  // and changes this.state.searchResults
	sortFunc(){
		// this.state.searchResult.sort(this.sortCard(parseFloat)); //for everything numbers
		console.log("Calling sortFunc");
		if ( this.state.field === "name" ) {
			this.state.searchResult.sort(this.sortCard(function(a){return a.toUpperCase()})); // for name
		} 
		else{
			this.state.searchResult.sort(this.sortCard(parseFloat)); //for numbers
		}
	}

	// changes from ascending -> descending or vice versa
	ascendingDescending(){
		this.setState({
			reverseSort:!this.state.reverseSort,
			}, () => this.sortFunc());
		console.log(this.state.reverseSort);
		// this.sortFunc();
		console.log("ascendingDescending called from SearchScreen");
	}

	// changes what to sort on (name, health, or attack)
	changeSortingType(type){
		this.setState({field:type}, () => this.sortFunc());
		
	}


	// The HTML to be rendered on the page
	render(){
		return(
			<div>
			<br />
				<SearchBar 
					// pass down the functions related to sort here
					// so that they can be used in the search bar
					ascendingDescending = {() => this.ascendingDescending()}
					changeSortingType = {(type) => this.changeSortingType(type)}
					
				/>
				{	/* passing the attribute "key" to the component makes it uniquely identifiable
					by React. As such React will notice when the key has changed and re-render the component.
					Essentially this means that the component will be deleted then created anew. */}
				{this.state.filter ? 
					<SearchResults 
						// passing down all the states related to showing the search result
						key = {this.state.filter} 
						filter = {this.state.filter} 
						field = {this.state.field} 
						reverseSort = {this.state.reverseSort} 
						searchResult = {this.state.searchResult} 
						//sort = {(primer) => this.sortFunc()}
					/> 
					: 
					<center><p>Enter a searchword to perform your query!</p></center>}
				
			</div>
		);
	}
}

export default SearchScreen;