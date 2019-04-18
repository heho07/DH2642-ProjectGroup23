import React, { Component } from "react";
import "./MyCollection.css";
import modelInstance from "../data/Model.js";
import { Link } from "react-router-dom";

class MyCollection extends Component{
	constructor(props){
		super(props);
		this.state = {
			usersCards:modelInstance.getUsersCards(),
			status:"loading",
		};
	}

	// componentWillMount(){
	// 	modelInstance.addObserver(this);
	// }

	// componentWillUnmount(){
	// 	modelInstance.removeObserver(this);
	// }



	componentDidMount(){
		console.log("web3 below ----------------------");
		console.log(window.web3);
		console.log("connect below ------------------------------------");
		console.log(window.ConnectClass);
		modelInstance.getCardFromUserAccount().then( () => {
			console.log("hello");
			// this.setState({
			// 	usersCards:modelInstance.getUsersCards(),
			// }, () => {
			// 	this.setState({
			// 		status:"done",
			// 	})
			// })
		});
	}

	
	cardInfo(obj){
		let img =null;
      	if (obj.img != null){
        	img = "https://images.weserv.nl/?url=" + obj.img.replace("http://", "");
      	}
		return (
			<div className = "col-sm-4">
				<center>
					<img src = {img} alt = {img} onError={e=>{e.target.onerror=null; e.target.src = "https://i.imgur.com/ZI9QakW.png"}}/>
				</center>
			</div>
			);
	}

	displayAllCards(){
		const cards = this.state.usersCards;
		console.log(cards);
		if (cards.length === 0){
			// Option if there are no cards in the collection. 

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
				// Returns the cards that are in the collection
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