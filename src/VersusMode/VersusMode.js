import React, { Component } from "react";
import modelInstance from "../data/Model.js";
import { Link } from "react-router-dom";

// A place to try out the gaming stuff
// currently only displays the cards in the users and the AI opponents decks
class VersusMode extends Component{
	
	// To make sure we don't delete stuff from the users collection when the cards die
	// we need to use a copy of the cards, not a reference.
	// Therefore we use the JSON.parse(JSON.stringify(array))
	// credit goes to https://stackoverflow.com/questions/9885821/copying-of-an-array-of-objects-to-another-array-without-object-reference-in-java 
	constructor(props){
		super(props);
		this.state = {
			usersCards:JSON.parse(JSON.stringify(modelInstance.getUsersCards())),
			opponentsCards:JSON.parse(JSON.stringify(modelInstance.getOpponentsCards())),
		};
	}


	cardInfo(obj){
		let img =null;
      	if (obj.img != null){
        	img = "https://images.weserv.nl/?url=" + obj.img.replace("http://", "");
      	}
		return (
			<div key = {obj.id}>
				<table>
					<tbody>
						<tr>
							<td>
								{/*<img src = {img} alt = {img}/>*/}
								<p>{obj.name}</p>
							</td>
							<td>
								<p>Health: {obj.health}</p>
								<p>Attack: {obj.attack}</p>
								<p>Cost: {obj.cost}</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			);
	}

	displayAllCards(owner){
		let cards = null;
		if (owner == "user") {
			cards = this.state.usersCards;
		}
		else if (owner == "opponent"){
			cards = this.state.opponentsCards;
		}
		else{
			return false;
		}
		if (cards === null){
			return <p>something went wrong</p>;
		}
		return (
				<div>
					{cards.map((item, i)=>{
						return this.cardInfo(item);
					})}
				</div>
			);
	}

	// Checks for what cards the user and opponent has
	// takes the first card from each deck and pits them against each other
	// basically subtracts the attack no. from the health attribute and updates the object
	// If a card is detected as dead (<0 hp) it is removed from the deck
	// maybe have this in the model instead? idk
	fight(){
		let usersCards = this.state.usersCards;
		let opponentsCards = this.state.opponentsCards;

		if (usersCards != undefined & opponentsCards != undefined & usersCards.length>0 & opponentsCards.length>0 ) {
			let usersCurrent = usersCards[0];
			let opponentsCurrent = opponentsCards[0];
			usersCurrent.health -= opponentsCurrent.attack;
			opponentsCurrent.health -= usersCurrent.attack;
			console.log("users " + usersCurrent.name + " attacked " + opponentsCurrent.name + " for " + usersCurrent.attack + " damage" );
			console.log("opponents " + opponentsCurrent.name + " attacked " + usersCurrent.name + " for " + opponentsCurrent.attack + " damage");
			if (usersCurrent.health <= 0) {
				usersCards.shift();
				console.log("users " + usersCurrent.name + " died!");
			}
			if (opponentsCurrent.health <= 0) {
				opponentsCards.shift();
				console.log("opponents " + opponentsCurrent.name + " died!");
			}
			this.setState({
				usersCards:usersCards,
				opponentsCards:opponentsCards,
			});
		}
	}

	render(){
		return (
				<div>
					<Link to = "/"><button>Go back</button></Link>
					<div className = "row">
						<div className = "col-sm-5">
							<h1>Users cards </h1>
							{this.displayAllCards("user")}
						</div>
						<div className = "col-sm-5">
							<h1>AI opponents cards</h1>
							{this.displayAllCards("opponent")}
						</div>
					</div>
					<div>
						<button onClick = {() => this.fight()}>Fight</button>
					</div>
				</div>
			);

	}
}












export default VersusMode;