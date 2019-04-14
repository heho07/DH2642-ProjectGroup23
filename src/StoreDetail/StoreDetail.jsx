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
			return (
				
				<div className ="col-12 justify-content-center align-self-center">
				<center>
					<p className="mb-0 "> This is not the card you're looking for</p>
					<img src = {img} alt = {img} className = "img-fluid"></img>
				</center>
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

			<div className= "row">
				<div className ="col-sm-12" >
					<center>
						<h1 >{card.name}</h1>	
						<p className="mb-0 " > {card.rarity} {card.race}</p>
		
						<table>
							<tr>
								<td>
									<img src = {img} alt = {img} className="specImg" />
								</td>
								<td>
									<p className="mb-0 "> <b>From set: </b> {card.cardSet} </p>
									<p className="mb-0 "> <b>Artist: </b>{card.artist} </p>
									<p className="mb-0 "> <b>Description: </b> <i>{card.flavor}</i></p>
									<br/>
								    <button className="purchaseButton btn btn-dark" >Purchase card</button> <br />
							    </td>

							</tr>
						</table>
			
					</center>	
				</div>
			
			</div>
		);

	
	}
}












export default StoreDetail;