import React, { Component } from "react";
import modelInstance from "../data/Model.js";
import { Link } from "react-router-dom";
import "./VersusMode.css";

// A place to try out the gaming stuff
// currently only displays the cards in the users and the AI opponents decks

// this uses drag & drop. Resources can be found:
// primarily: https://www.w3schools.com/html/html5_draganddrop.asp
// a lot here: https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
// kind of here: https://medium.freecodecamp.org/reactjs-implement-drag-and-drop-feature-without-using-external-libraries-ad8994429f1a

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

	// When this component is instaniated we add it to the list of observers in the model
	componentDidMount(){
		modelInstance.addObserver(this);
	}

	componentWillUnmount(){
		modelInstance.removeObserver(this);
	}

	// this will be called when the model calls "notifyObservers()"
	update(){
		this.setState({
			usersCards:JSON.parse(JSON.stringify(modelInstance.getUsersCards())),
			opponentsCards:JSON.parse(JSON.stringify(modelInstance.getOpponentsCards())),
		});
	}

	onDrag(event, obj){
		event.dataTransfer.setData("draggedObject", JSON.stringify(obj));
	}

	dragOver(event, obj){
		event.preventDefault();
		// Maybe make some nice colors?
	}

	onDrop(event, obj){
		event.preventDefault();
		let foreignObject = JSON.parse(event.dataTransfer.getData("draggedObject"));
		this.fight(obj, foreignObject);
	}

	// Displays information about a specific card
	cardInfo(obj){
		// let img = null;
  //     	if (obj.img != null){
  //       	img = "https://images.weserv.nl/?url=" + obj.img.replace("http://", "");
  //     	}

  //added some background color to the tr to make it more visably discernably between the different elements
  // HOWEVER it kind of looks like shit so idk
  		let bgColors = [];
  		for (var i = 0; i <3; i++) {
  			let toAdd = Math.floor((obj.cardId.charCodeAt(0) * (200-60+1))%150 + 100 )%150;
  			if (toAdd < 90) {
  				toAdd += 100;
  			}
  			bgColors.push(toAdd);
  		}
		return (			
			<tr key = {obj.cardId} draggable = "true" onDragStart = {(event) => this.onDrag(event, obj)} onDragOver = {(event) => this.dragOver(event, obj)} 
			onDrop = {(event) => this.onDrop(event,obj)}
			style = {{backgroundColor:`rgb(${bgColors})`}}
			>
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
		);
	}

	// Displays all cards for either the user or the opponent AI
	displayAllCards(owner){
		let cards = null;
		if (owner === "user") {
			cards = this.state.usersCards;
		}
		else if (owner === "opponent"){
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
					<table className = " table table-bordered ">
						<tbody>
							{cards.map((item, i)=>{
								return this.cardInfo(item);
							})}
						</tbody>
					</table>
				</div>
			);
	}

	// Checks for what cards the user and opponent has
	// takes the first card from each deck and pits them against each other
	// basically subtracts the attack no. from the health attribute and updates the object
	// If a card is detected as dead (<0 hp) it is removed from the deck
	// maybe have this in the model instead? idk
	fight(obj1, obj2){
		let usersCards = this.state.usersCards;
		let opponentsCards = this.state.opponentsCards;
		let history = this.state.history;
		let usersCurrent;
		let opponentsCurrent;
		if (usersCards !== undefined & opponentsCards !== undefined & usersCards.length>0 & opponentsCards.length>0 ) {
			if (obj1 === undefined || obj2 === undefined) {
				usersCurrent = usersCards[0];
				opponentsCurrent = opponentsCards[0];
				console.log("undefined objects into fight");
			}
			else{
				opponentsCurrent = obj1;
				usersCurrent = obj2;
				console.log("setting the objects accordingly");
				console.log("users");
				console.log(usersCurrent);
				console.log("opponents");
				console.log(opponentsCurrent);
			}
			usersCurrent.health -= opponentsCurrent.attack;
			opponentsCurrent.health -= usersCurrent.attack;
			let userInfo = "users " + usersCurrent.name + " attacked " + opponentsCurrent.name + " for " + usersCurrent.attack + " damage";
			let opponentInfo = "opponents " + opponentsCurrent.name + " attacked " + usersCurrent.name + " for " + opponentsCurrent.attack + " damage";
			history.push(userInfo);
			history.push(opponentInfo);
			if (usersCurrent.health <= 0) {
				for (let i = usersCards.length - 1; i >= 0; i--) {
					if (usersCards[i].cardId === usersCurrent.cardId){
						usersCards.splice(i, i);
					}
				}
				history.push("users " + usersCurrent.name + " died!");
			}
			if (opponentsCurrent.health <= 0) {
				for (let i = opponentsCards.length - 1; i >= 0; i--) {
					if (opponentsCards[i].cardId === opponentsCurrent.cardId){
						opponentsCards.splice(i, i);
					}
				}
				history.push("opponents " + opponentsCurrent.name + " died!");
			}
			this.setState({
				usersCards:usersCards,
				opponentsCards:opponentsCards,
				history:history,
			});
		}
	}


	// this method tells the model to perform a query for cards of a certain quality
	// it then tells the model to select a few cards from there at random
	// which it then tells the model to add to the opponents deck
	addCardsToDeck(quality, destination){
		modelInstance.searchDeckByQuality(quality)
			.then((result) => modelInstance.selectRandomCardsForOpponent(result))
				.then((result) => {
					for (var i = result.length - 1; i >= 0; i--) {
						modelInstance.addCardToDeck(result[i], destination);
					}
				})
	}


	render(){
		return (
				<div>

					{/* This div is purely to test stuff out with, can be commented out and should be removed later on */}
					<div id = "testDiv">
						<h3>For testing purposes</h3>
						<p>Test out the different stuff by adding cards. Adding cards does not clear the deck. This div should be removed later on</p>
						<button onClick = {() => this.addCardsToDeck("Free", "opponent")}>Add Free cards to opponent</button>
						<button onClick = {() => this.addCardsToDeck("Common", "opponent")}>Add Common cards to opponent</button>
						<button onClick = {() => this.addCardsToDeck("Rare", "opponent")}>Add Rare cards to opponent</button>
						<button onClick = {() => this.addCardsToDeck("Epic", "opponent")}>Add Epic cards to opponent</button>
						<button onClick = {() => this.addCardsToDeck("Legendary", "opponent")}>Add Legendary cards to opponent</button>
						<button onClick = {() => modelInstance.clearCards("opponent")}>Clear the opponents deck</button>
						<br/>
						<br/>
						<button onClick = {() => this.addCardsToDeck("Free", "user")}>Add Free cards to user</button>
						<button onClick = {() => this.addCardsToDeck("Common", "user")}>Add Common cards to user</button>
						<button onClick = {() => this.addCardsToDeck("Rare", "user")}>Add Rare cards to user</button>
						<button onClick = {() => this.addCardsToDeck("Epic", "user")}>Add Epic cards to user</button>
						<button onClick = {() => this.addCardsToDeck("Legendary", "user")}>Add Legendary cards to user</button>
						<button onClick = {() => modelInstance.clearCards("user")}>Clear the users deck</button>
						<br/>
						<br/>
					</div>

					<Link to = "/ChooseDifficulty"><button title = "Can't take the heat? Better retreat and change difficulty">Retreat</button></Link>
					<div>
						{/* I want this to take up more height even when it is empty. idk how though, at least without using px */}
						<div className = "row border border-dark " id = "cardInfo">
							<div className = "col-sm-5">
								<h1>Users cards </h1>
								{this.displayAllCards("user")}
							</div>
							<div className = "col-sm-1">
								<button onClick = {() => this.fight()}>Fight</button>	
							</div>
							<div className = "col-sm-5" id = "opponentsCards">
								<h1 id = "opponentHeader">AI opponents cards</h1>
								{this.displayAllCards("opponent")}
							</div>
						</div>
						<hr/>

					{/* scrollable via css
						need to make it so that the scrollbar is focused to the bottom automatically. implement:
						https://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up/21067431
						or this https://stackoverflow.com/questions/40336311/how-can-i-make-a-scrollable-component-that-scrolls-to-the-latest-children-compon
					 */}
						<div id = "gameResult">
								{this.state.history.map((item, i)=> {
							
								return <p key = {i}>{item}</p>}
							)}
							
						</div>
					</div>
				</div>
			);

	}
}












export default VersusMode;