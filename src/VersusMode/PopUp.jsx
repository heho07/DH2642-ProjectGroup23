import React, { Component } from "react";

class PopUp extends Component{
	constructor(props) {
		super(props);
	}

	render(){
		return (
				// Generates the rules in the pop, accessed from the Versus mode
				<div>
					<h1>How to play</h1>
					<p>The goal of the game is to defeat you opponent by beating their cards with your cards.</p>
					<p>Grab one of your cards with your mouse and drag it over the opponents card to attack.</p>
					<p>However, notice that your card will be damaged by the opponetns <b>attack</b> value.</p>
					<p>Whenever a card is attacked, its <b>health</b> will diminish until it is defeated.</p>
					<p> Good luck.</p>
					<button className="btn btn-dark" onClick = {() => this.props.addCard()}>Demo</button>										
				</div>
			);
	}
}












export default PopUp;