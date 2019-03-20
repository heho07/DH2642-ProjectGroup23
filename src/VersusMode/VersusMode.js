import React, { Component } from "react";
import modelInstance from "../data/Model.js";
import { Link } from "react-router-dom";
import "./VersusMode.css";

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
			history:[],
		};
	}


	cardInfo(obj){
		let img = null;
      	if (obj.img != null){
        	img = "https://images.weserv.nl/?url=" + obj.img.replace("http://", "");
      	}
		return (
			<div key = {obj.id}>
				<table class = " table table-bordered "> 
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

	//TODO: make it so that the table is created here instead of in this.cardInfo()
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
		let history = this.state.history;
		if (usersCards != undefined & opponentsCards != undefined & usersCards.length>0 & opponentsCards.length>0 ) {
			let usersCurrent = usersCards[0];
			let opponentsCurrent = opponentsCards[0];
			usersCurrent.health -= opponentsCurrent.attack;
			opponentsCurrent.health -= usersCurrent.attack;
			let userInfo = "users " + usersCurrent.name + " attacked " + opponentsCurrent.name + " for " + usersCurrent.attack + " damage";
			let opponentInfo = "opponents " + opponentsCurrent.name + " attacked " + usersCurrent.name + " for " + opponentsCurrent.attack + " damage";
			history.push(userInfo);
			history.push(opponentInfo);
			if (usersCurrent.health <= 0) {
				usersCards.shift();
				history.push("users " + usersCurrent.name + " died!");
			}
			if (opponentsCurrent.health <= 0) {
				opponentsCards.shift();
				history.push("opponents " + opponentsCurrent.name + " died!");
			}
			this.setState({
				usersCards:usersCards,
				opponentsCards:opponentsCards,
				history:history,
			});
		}
	}

	render(){
		return (
				<div>
					<Link to = "/"><button>Go back</button></Link>
					<button onClick = {() => this.fight()}>Fight</button>	
					<div>
						{/* I want this to take up more height even when it is empty. idk how though, at least without using px */}
						<div className = "row border border-dark " id = "cardInfo">
							<div className = "col-sm-5">
								<h1>Users cards </h1>
								{this.displayAllCards("user")}
							</div>
							<div className = "col-sm-5" id = "opponentsCards">
								<h1>AI opponents cards</h1>
								{this.displayAllCards("opponent")}
							</div>
						</div>
						<hr/>

					{/* This will be made scrollable via css
						need to make it so that the scrollbar is focused to the bottom automatically. implement:
						https://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up/21067431
						or this https://stackoverflow.com/questions/40336311/how-can-i-make-a-scrollable-component-that-scrolls-to-the-latest-children-compon
					 */}
						<div id = "gameResult">
								{this.state.history.map((item, i)=> {
							
								return <p>{item}</p>}
							)}
							
						</div>
					</div>
				</div>
			);

	}
}












export default VersusMode;