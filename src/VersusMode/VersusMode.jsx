import React, { Component } from "react";
import modelInstance from "../data/Model.js";
import { Link } from "react-router-dom";
import "./VersusMode.css";
import Popup from "reactjs-popup";
import PopUp from "./PopUp";

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
			gamestate:"",
		};
	}

	// When this component is instaniated we add it to the list of observers in the model
	componentDidMount(){
		modelInstance.addObserver(this);

		this.saveOriginalHealth();
	}

	componentWillUnmount(){
		modelInstance.removeObserver(this);
	}

	componentDidUpdate(){
		const test = document.getElementById("gameResult");
		test.scrollTop =test.scrollHeight;
	
	}

	saveOriginalHealth(){
		//saving the original health of the cards
		let cards = this.state.opponentsCards;
		this.setState({opponentsCards:[]});
		cards.forEach((card) => {
				card["originalHealth"] = card.health;
			}
		);
		this.setState({opponentsCards:cards});
		// this.state.opponentsCards.forEach((card) =>{
		// 		card["originalHealth"] = card.health;
		// 	}
		// );
		cards = this.state.usersCards;
		this.setState({usersCards:[]});
		cards.forEach((card) => {
				card["originalHealth"] = card.health;
			}
		);
		this.setState({usersCards:cards});
	}
	// this will be called when the model calls "notifyObservers()"
	update(){
		this.setState({
			usersCards:JSON.parse(JSON.stringify(modelInstance.getUsersCards())),
			opponentsCards:JSON.parse(JSON.stringify(modelInstance.getOpponentsCards())),
		}, () => this.saveOriginalHealth());
	}


	// This method is called when the object is dragged. 
	// Transfers the object data as a JSON string via the event
	onDrag(event, obj){
		event.dataTransfer.setData("draggedObject", JSON.stringify(obj));
	}

	// This method is called when the object is dragged over a dropable spot
	dragOver(event, obj){
		event.preventDefault();
		// Maybe make some nice colors?
	}

	// handles what happens when something is dropped
	onDrop(event, obj){
		event.preventDefault();
		// to be able to transfer the object we have to send it as JSON string
		// and then parse it to a JSON object. This creates a copy of the file, 
		// which makes us unable to change it the way we want in the fight() method
		// A potential fix to make this smoother is to simply 
		// send the cardId via the event.dataTranser(). However it currently works, so..
		let draggedObjectCopy = JSON.parse(event.dataTransfer.getData("draggedObject"));
		let objectToSendToFight;
		for (var i = 0; i < this.state.usersCards.length; i++) {
			if (this.state.usersCards[i].cardId === draggedObjectCopy.cardId){
				objectToSendToFight = this.state.usersCards[i];
			}
		}
		this.fight(obj, objectToSendToFight);
	}
	
	// Displays information about a specific card
	cardInfo(obj, owner){
		let img = null;
      	if (obj.img != null){
        	img = "https://images.weserv.nl/?url=" + obj.img.replace("http://", "");
      	}

		return (			
			<table className ="table table-borderless" 
				key = {obj.cardId + obj.name}>
				<tbody>
					<tr key = {obj.cardId} 
						draggable = {owner === "user"}		 //is draggable if users card 
						onDragStart = {owner === "user" ? (event) => this.onDrag(event, obj) : null} // can only be dragged if users card 
						onDragOver = {owner === "opponent" ? (event) => this.dragOver(event, obj) : null} 	// can only be dragged over opponents card
						onDrop = {owner === "opponent" ? (event) => this.onDrop(event,obj) : null}	// can only be dropped on opponents card
						//style = {{backgroundColor:`rgb(${bgColors})`}}
						>
						<td>
							<h3>{obj.name}</h3>
							<div className = "cropped ">
								<img src = {img} alt = {img} onError={e=>{e.target.onerror=null; e.target.src = "https://i.imgur.com/ZI9QakW.png"}} className = "vsImg"/>
							</div>
							<div className = "flexContainer">
								<div className = "statInfo">
									<p className="statText">Health: {obj.health + "/" +  obj.originalHealth}</p>
								
								</div>
								<div className = "statInfo">
									<p className="statText">Attack: {obj.attack}</p>

								</div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}

	// Displays all cards for either the user or the opponent AI
	displayAllCards(owner){

		let cards = null;
		if (owner === "user") {
			cards = this.state.usersCards;
			return (
				<div>
					{cards.map((item, i)=>{
						return this.cardInfo(item, owner);
					})}
				</div>
			);
		}
		else if (owner === "opponent"){
			cards = this.state.opponentsCards;
			return (
					<div className = "opponentsCards">
						{cards.map((item, i)=>{
							return this.cardInfo(item, owner);
						})}
					</div>
				);
		}
		else{
			return <p>something went wrong</p>;
		}
	}

	// Checks for what cards the user and opponent has
	// takes the first card from each deck and pits them against each other
	// basically subtracts the attack no. from the health attribute and updates the object
	// If a card is detected as dead (<0 hp) it is removed from the deck
	// maybe have this in the model instead? idk
	fight(onDropObject, draggedObjectCopy){
		let usersCards = this.state.usersCards;
		let opponentsCards = this.state.opponentsCards;
		let history = this.state.history;
		let usersCurrent;
		let opponentsCurrent;
		if (usersCards !== undefined & opponentsCards !== undefined & usersCards.length>0 & opponentsCards.length>0 ) {
			if (onDropObject === undefined || draggedObjectCopy === undefined) {
				usersCurrent = usersCards[0];
				opponentsCurrent = opponentsCards[0];
				console.log("undefined objects into fight");
			}
			else{
				// if no arguments are passed to the method
				// then we get the objects from the drag events
				opponentsCurrent = onDropObject;
				usersCurrent = draggedObjectCopy;
			}
			usersCurrent.health -= opponentsCurrent.attack;
			opponentsCurrent.health -= usersCurrent.attack;
			
			// strings used for information
			let userInfo = "users " + usersCurrent.name + " attacked " + opponentsCurrent.name + " for " + usersCurrent.attack + " damage";
			let opponentInfo = "opponents " + opponentsCurrent.name + " attacked " + usersCurrent.name + " for " + opponentsCurrent.attack + " damage";
			history.push(userInfo);
			history.push(opponentInfo);

			if (usersCurrent.health <= 0) {
				for (let i = usersCards.length - 1; i >= 0; i--) {
					if (usersCards[i].cardId === usersCurrent.cardId){
						usersCards.splice(i, 1);
					}
				}
				history.push("users " + usersCurrent.name + " died!");
			}
			if (opponentsCurrent.health <= 0) {
				for (let i = 0; i < opponentsCards.length; i++) {
					if (opponentsCards[i].cardId === opponentsCurrent.cardId){
						opponentsCards.splice(i, 1);
					}
				}
				history.push("opponents " + opponentsCurrent.name + " died!");
			}
			this.setState({
				usersCards:usersCards,
				opponentsCards:opponentsCards,
				history:history,
			});

			if(this.won()){
				this.setState({
					gamestate:"GLORIOUS VICTORY",
				})
			}
			if(this.lost()){
				this.setState({
					gamestate:"SHAMEFUL DEFEAT",
				})
			}
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


	won(){
		const won = this.state.opponentsCards.length === 0 && this.state.usersCards.length !== 0;
		return won;
	}
	lost(){
		const lost = this.state.usersCards.length === 0 && this.state.opponentsCards.length !== 0;
		return lost;
	}


	render(){
		return (
				<div>

					{/* Commented out to check how the final screen looks.
					 This div is purely to test stuff out with, can be commented out and should be removed later on 
					<div id = "testDiv">
						<h3>For testing purposes</h3>
						<p>Test out the different stuff by adding cards. Adding cards does not clear the deck. This div should be removed later on</p>
						<button className="btn btn-dark" id="addButton" onClick = {() => this.addCardsToDeck("Free", "opponent")}>Add Free cards to opponent</button>
						<button className="btn btn-dark" id="addButton" onClick = {() => this.addCardsToDeck("Common", "opponent")}>Add Common cards to opponent</button>
						<button className="btn btn-dark" id="addButton" onClick = {() => this.addCardsToDeck("Rare", "opponent")}>Add Rare cards to opponent</button>
						<button className="btn btn-dark" id="addButton" onClick = {() => this.addCardsToDeck("Epic", "opponent")}>Add Epic cards to opponent</button>
						<button className="btn btn-dark" id="addButton" onClick = {() => this.addCardsToDeck("Legendary", "opponent")}>Add Legendary cards to opponent</button>
						<button className="btn btn-dark" id="addButton" onClick = {() => modelInstance.clearCards("opponent")}>Clear the opponents deck</button>
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
					*/}


					<div className ="btndiv">
											
						<center>
							<Link to = "/ChooseDifficulty"><button className="btn btn-dark infoButton" title = "Can't take the heat? Better retreat and change difficulty">Retreat</button></Link>
							
							<button className = "btn btn-dark infoButton" onClick = {() => this.fight()}>Fight</button>

							<Popup trigger = {<button className = "btn btn-dark infoButton">How to play</button>} position ="bottom center">
								<PopUp/>
							</Popup>
							
						</center>
					
					</div>

					<h1 className="text-center"> {this.state.gamestate} </h1>

					<div style={{width:window.innerWidth*0.99, height:window.innerHeight*0.95, "minHeight":"15%"}}>
						{/* I want this to take up more height even when it is empty. idk how though, at least without using px */}
						<div className = " border border-dark " id = "cardInfo">

							<div >
								<h1>Users cards </h1>
								<hr/>
								{this.displayAllCards("user")}
							</div>
							
							<div  id = "opponentsCards">
								<h1>AI opponents cards</h1>
								<hr/>
								{this.displayAllCards("opponent")}
							</div>
						</div>
						<hr/>

					{/* scrollable via css
						need to make it so that the scrollbar is focused to the bottom automatically. implement:
						https://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up/21067431
						or this https://stackoverflow.com/questions/40336311/how-can-i-make-a-scrollable-component-that-scrolls-to-the-latest-children-compon
					 */}

						<div id = "gameResult" style={{width:window.innerWidth, height:window.innerHeight*0.05, "minHeight":"15%"}}>
					 		<h1>Fight history</h1>
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