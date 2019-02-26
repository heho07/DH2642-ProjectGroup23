import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./SearchScreen.css";


// This screen should probably be split up into several components. Maybe one for the search and one for displaying the results
// They can then communicate with eachother via a parent component which keeps track of their states for easy communication
class SearchScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			searchResult: null,
			loading: true,
			filter:"",
		}
	}


	// Receives a promise of a Json object and then adds the object to the components state
	// also notifies the component that it is no longer loading
	searchForCard(event){
		event.preventDefault();
		this.props.model.searchCards(this.state.filter).then(
			results =>{ 
				console.log(results);
				this.setState({
					loading: false, 
					searchResult: results
				});
			}
		).catch(
			e => this.setState({loading:null})
		);
	}

	// If a change is detected in the input field the components state is changed accordingly
	handleChangeOfInput(event){
		this.setState({
			filter: event.target.value,
		});
	}

	// Creates HTML containing information about the cards found in the search
	showCard(){

		return(
			<div>
				<table>
					<tbody>
						{this.state.searchResult.map((item, i) => {
							return(
								<tr key = {item.cardId}>
									<td><img src = {item.img} alt = {item.img} onError={e=>{e.target.onerror=null; e.target.src = "https://t3.ftcdn.net/jpg/01/20/55/62/500_F_120556266_mRv3efLLQlc8m3NcVJG7jAIARhBoATpn.jpg"}}/></td>
									<td>{"name: " + item.name}</td>
									<td>{"id: " + item.cardId}</td>
									<td>{"type: " + item.type}</td>
									<td>{"cost: " + item.cost}</td>
									<td>{"attack: " + item.attack}</td>
									<td>{"health: " + item.health}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<p>thisWillShowTheCurrentCard</p>
			</div>

		);
	}

	// The HTML to be rendered on the page
	render(){
		let information = null;
		// Checks if we are loading or not using the components state
		switch(this.state.loading){
			case true:
				information = <p>loading...</p>;
				break;
			case false:
				information = this.showCard();
				break;
			default:
				information = <p>Something went wrong</p>;
				break;
		}

		return(
			<div>
				<p>This is the second screen</p>
				<Link to = "/">
					<button>This button will take us back to the welcome-screen</button>
				</Link>
				<div>
					<form onSubmit = {(event) => this.searchForCard(event)} >
						<input id = "filter" type = "text" value = {this.state.filter} onChange = {(event) => this.handleChangeOfInput(event)}/>
						<input type = "submit"></input>
					</form>
				</div>
				<div>{information}</div>
			</div>
		);
	}
}

export default SearchScreen;