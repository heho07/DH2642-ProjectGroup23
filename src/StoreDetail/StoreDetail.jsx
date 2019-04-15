import React, { Component } from "react";
import "./StoreDetail.css";
import modelInstance from "../data/Model";
import queryString from 'query-string';

class StoreDetail extends Component{

	constructor(props) {
		super(props);
		// we access the id from the URL 
		let url = this.props.location.search;
		this.state = {
			cardId:queryString.parse(url).id,
			card:null,
			status:"loading",
		}
	};

	componentDidMount(){
		let found = false;
		// checks if the user has the card with matching cardId in the model
		modelInstance.getSearchedCards().forEach((item) => {
			if (item.cardId === this.state.cardId) {
				this.setState({
					card:item,
					status:"done",
				});
				found = true;
			}
		});
		// if the card was not found we query the API for the card
		if (!found) {
			modelInstance.searchCardsById(this.state.cardId).then((res) => {
				this.setState({
					card:res[0],
					status:"done",
				})
			}).catch( (e) => {
				// handling potential error from the API
				console.log(e);
				this.setState({status:"Error"})
			});
		}

	}



	render() {
		let toReturn;
		if (this.state.status === "loading") {
			toReturn = <center><div className = "loader">loading</div></center>;
		}
		else if (this.state.status === "done"){
		// If the card has finished loading from the model / API
			let card = this.state.card;
			if(card.race === undefined){
				card.race = card.type;
			}
			let img = "https://images.weserv.nl/?url=" + card.img.replace("http://", "");
			toReturn = (
			/* Returns a div that contains the necessary info on a specific card. 
				The Purchase button will take the user to a pop up where cards can
				be bought via the blockchain.  */
				<div className= "row">
					<div className ="col-sm-12" >
						<center>
							<h1 >{card.name}</h1>	
							<p className="mb-0 " > {card.rarity} {card.race}</p>
							<table>
								<tr>
									<td>
										<img src = {img} alt = {img} onError={e=>{e.target.onerror=null; e.target.src = "https://i.imgur.com/ZI9QakW.png"}} className="specImg" />
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
		// if error we show some error screen
		else if (this.state.status === "Error"){
			let img = "http://i.imgur.com/IlRXBtu.jpg";
			toReturn = (
				<div className ="col-12 justify-content-center align-self-center">
					<center>
						<p className="mb-0 "> This is not the card you're looking for, something went wrong</p>
						<img src = {img} alt = {img} className = "img-fluid"></img>
					</center>
				</div>
			);
		}
		return <div>{toReturn}</div>
	}
}


export default StoreDetail;