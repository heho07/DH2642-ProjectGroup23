import React, { Component } from "react";
import "./StoreDetail.css";
import modelInstance from "../data/Model";


class StoreDetail extends Component{
	constructor(props) {
		super(props);
		this.state = {
			
		}
	};

	render() {
		const card = modelInstance.getCard();
		console.log(card);
		let img = "http://i.imgur.com/IlRXBtu.jpg";
		if(card === undefined){
			return (<div className ="col-6 justify-content-center align-self-center">
				<p className="mb-0 "> This is not the card you're looking for</p>
				<img src = {img} alt = {img} className = "img-fluid"></img>
			</div>)
		}
		if (card.img !== null){
			img = "https://images.weserv.nl/?url=" + card.img.replace("http://", "");
		} 
		console.log(card.race);
		if(card.race === undefined){
			card.race = card.type;
		}
	

		return(

			<div className= "row align-middle">
				<div className ="col-12 text-center" >
					<h1 >{card.name}</h1>		
					<p className="mb-0 " > {card.rarity} {card.race}</p>
					<center>
						<img src = {img} alt = {img} />
					</center>
				</div>
				<div className ="col-6 justify-content-center align-self-center">
					
					<p className="mb-0 "> From set: {card.cardSet} </p>
					<p className="mb-0 "> Artist: {card.artist} </p>
					<p className="mb-0 "> {card.flavor}</p>
				</div>
			</div>
		);

	
	}
}












export default StoreDetail;