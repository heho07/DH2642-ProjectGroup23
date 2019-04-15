import React, { Component } from "react";
import "./StoreDetail.css";
import modelInstance from "../data/Model";
import queryString from 'query-string';

class StoreDetail extends Component{

	constructor(props) {
		super(props);
		let url = this.props.location.search;
		this.state = {
			cardId:queryString.parse(url).id,
			card:null,
			status:"loading",
		}
	};

	componentDidMount(){
		let found = false;
		modelInstance.getSearchedCards().forEach((item) => {
			if (item.cardId === this.state.cardId) {
				console.log("hittade i modellen");
				this.setState({
					card:item,
					status:"done",
				});
				found = true;
			}
		});
		if (!found) {
			modelInstance.searchCardsById(this.state.cardId).then((res) => {
				this.setState({
					card:res,
					status:"done",
				})
			}).catch( (e) => {
				console.log(e);
				this.setState({status:"Error"})
			});
		}

	}



	render() {
		let toReturn;
		if (this.state.status === "loading") {
			console.log("TRUE");
			toReturn = <p>loading</p>;
		}
		else if (!this.state.status === "done"){
			console.log("FALSE");

			let card = this.state.card;
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
		else if (this.state.status === "Error"){
			console.log("error?????????");
			console.log(this.state.status);
			toReturn = <p>something went wrong</p>;
		}
		return <div>{toReturn}</div>
	}
}












export default StoreDetail;