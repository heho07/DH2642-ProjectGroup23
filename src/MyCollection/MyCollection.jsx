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
			<div className = "col-sm-4">
				<center>
					<img src = {img} alt = {img} onError={e=>{e.target.onerror=null; e.target.src = "https://t3.ftcdn.net/jpg/01/20/55/62/500_F_120556266_mRv3efLLQlc8m3NcVJG7jAIARhBoATpn.jpg"}}/>
				</center>
			</div>
			);
	}

	displayAllCards(){
		const cards = this.state.usersCards;
		console.log("cards: " +cards);
		if (cards.length === 0){
			return (
				<div className ="row">
				<div className ="col-sm-12">
					<center>
						<h1>
							Sorry, no cards fam! 
						</h1> 
						<p className= "textExplain">
							Try going to the store and pick a a few cards.
						</p> 
						<Link to="/SearchScreen">
                			<button type="button" className="btn btn-dark" id="backButton">Go to the store</button>
              			</Link>
					</center>
	  			</div>	
	  			</div>
			);
		}
		else {
			return(
				<div className="row">
				<div className="col-sm-12">
					<center>
						<h1>My Collection</h1>
					</center>
				</div>
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
				<br />
				<p className="textExplain">
					Or go back to the menu for other options
				</p> 

				<Link to = "/">
					<button className="btn btn-dark" id="backButton">Go back to the menu</button>
				</Link>
				</center>
			</div>);


	}
}












export default MyCollection;