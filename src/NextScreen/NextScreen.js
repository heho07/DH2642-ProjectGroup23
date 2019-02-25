import React, { Component } from "react";
import { Link } from "react-router-dom";

class NextScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			currentCard: null,
			loading: true,
		}
	}


	// Receives a promise of a Json object and then adds the object to the components state
	// also notifies the component that it is no longer loading
	searchForCard(filter){
		this.props.model.searchCards(filter).then(
			results =>{ 
				console.log(results);
				this.setState({
					loading: false, 
					currentCard: results
				});
			}
		);
	}

	// Creates HTML containing information about the cards found in the search
	showCard(){
		return(
			<div>
				<table>
					<tbody>
						{this.state.currentCard.map((item, i) => {
							return(
								<tr key = {item.cardId}>
									<td><img src = {item.img}/></td>
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
				information = <marquee>loading...</marquee>;
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
				<button onClick = {() => this.searchForCard("ysera")}>search for ysera</button>
				<div>{information}</div>
			</div>
		);
	}
}

export default NextScreen;