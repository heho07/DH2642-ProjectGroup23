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
				<img src = {img} alt = {img}/>
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
				<td>
					{cards.map((item, i)=>{
						return this.cardInfo(item);
					})}
				</td>
	
			)
		}
	}
	
	render(){
		return(
			<div>
				<table class = "table table-borderless">
					<tbody>
						<tr> 
							<td>
								{this.displayAllCards()} 
							</td>
						</tr>
					</tbody>
				</table>
				<center>
				<Link to = "/">
					<button className="btn btn-dark" id="backButton">Go back</button>
				</Link>
				</center>
			</div>);


	}
}












export default MyCollection;