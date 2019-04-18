import React, { Component } from "react";
import modelInstance from "../data/Model.js";


import "./ChooseDifficulty.css";


// Here you will be able to choose the difficulty before the fight begins
class ChooseDifficulty extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			loading:false,
		};
	}
	// this method tells the model to perform a query for cards of a certain quality
	// it then tells the model to select a few cards from there at random
	// which it then tells the model to add to the deck of the destination given
	addCardsToDeck(quality, destination){
		this.setState({loading:true});
		if (destination === "opponent") {
			modelInstance.clearCards(destination);
		}
		modelInstance.searchDeckByQuality(quality)
			.then((result) => modelInstance.selectRandomCardsForOpponent(result))
				.then((result) => {
					for (var i = result.length - 1; i >= 0; i--) {
						modelInstance.addCardToDeck(result[i], destination);
					}
				}).then(() => {
					modelInstance.getCardFromUserAccount().then( () => {
						this.setState({
							usersCards:modelInstance.getUsersCards(),
						}, () => {
							this.props.history.push('/VersusMode')
						})
					});
			});
		}
// 
	// creates the input buttons that the user can use to decide the difficulty
	difficultySetting(quality, iterationNumber){
		// TODO: Make this look pretty. Maybe include some cool pictures?
		let diff = "";
		let description = "The opponents cards will be picked from the set of "+quality+" cards";
		switch (quality){
			case 'Free':
				diff = "Easy";

				break;
			case 'Common':
				diff = "Normal";

				break;
			case 'Rare':
				diff = "Hard";
				break;
			case 'Epic':
				diff = "Very hard";
				break;
			case 'Legendary':
				diff = "Impossible";
				break;
			default:
				diff = "Something went awry";
				break;
		}

		return(
			<div>

					<button onClick = {() => this.addCardsToDeck(quality, "opponent")} className = "diffButton btn btn-dark" >{diff}</button>
				<p id="textBelow">
					{description}
				</p>
			</div>
			);
	}


	render(){
		const difficulties = ["Free", "Common", "Rare", "Epic", "Legendary"];
		// if the cards are loading we notify the user of this.
		// if the cards are not loading we show the 'choose difficulty' screen. This is shown by default
		let toReturn = this.state.loading ? <center><div className = "loader">loading</div></center> :
				<div>
					<center>
						<h1 className="header">Choose your difficulty!</h1>
					</center>
					<div className = "row">
						{difficulties.map((item, i) => {
							return (
									<div className = "col-sm-4" key = {"difficulty: " + item}>
										{this.difficultySetting(item)}
									</div>
								);

						})}
					</div>
					
				</div>
		return (<div>{toReturn}</div>	);

	}
}












export default ChooseDifficulty;