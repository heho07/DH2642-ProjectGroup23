import React, { Component } from "react";
import "./MyCollection.css";
import modelInstance from "../data/Model.js";
import { Link } from "react-router-dom";

class MyCollection extends Component{
	constructor(props){
		super(props);
		this.state = {
			usersCards:modelInstance.getUsersCards(),
		};
	}


	
	cardInfo(obj){
		let img =null;
      	if (obj.img != null){
        	img = "https://images.weserv.nl/?url=" + obj.img.replace("http://", "");
      	}
		return (
				<img src = {img} alt = {img} onError={e=>{e.target.onerror=null; e.target.src = "https://t3.ftcdn.net/jpg/01/20/55/62/500_F_120556266_mRv3efLLQlc8m3NcVJG7jAIARhBoATpn.jpg"}}/>
			);
	}

	displayAllCards(){
		const cards = this.state.usersCards;
		console.log("cards: " +cards);
		if (cards.length === 0){
			return (
				<div className="container">
					<center>
						<h1>
							Sorry, no cards fam 
						</h1> 
						<span>
							Try going to the seach screen and pick a a few cards, then return here
						</span> 
					</center>
	  			</div>	
			);
		}
		else {
			return(
				<div>
					{cards.map((item, i)=>{
						return this.cardInfo(item);
					})}
				</div>
	
			)
		}
	}
	
	render(){
		return(
			<div>
				{/*Removed the table from here. Unnecessary*/}
				{this.displayAllCards()} 
					
				<center>
				<Link to = "/">
					<button className="btn btn-dark" id="backButton">Go back</button>
				</Link>
				</center>
			</div>);


	}
}












export default MyCollection;