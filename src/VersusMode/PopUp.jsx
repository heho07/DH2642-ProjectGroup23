import React, { Component } from "react";

class PopUp extends Component{
	
	constructor(props){
		super(props);

	}

	render(){
		return (
				<div>
					<h1>How to play</h1>
					<p>The goal of the game is to defeat you opponent by beating their cards with your cards.</p>
					<p>Grab one of your cards with your mouse and drag it over the opponents card to attack.</p>
					<p>However, take care that your card will be damaged by the opponetns attack value.</p>
					<p>Whenever a card is attacked, it's Health will diminish until it is defeated.</p>
					<p> Good luck.</p>
				</div>
			);
	}
}












export default PopUp;