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
			<td className="align-middle resultImage">
                 	<center>
                    <h1></h1>
                    <img src = {img} alt = {img} onError={e=>{e.target.onerror=null; e.target.src = "https://t3.ftcdn.net/jpg/01/20/55/62/500_F_120556266_mRv3efLLQlc8m3NcVJG7jAIARhBoATpn.jpg"}}/>
                  </center>
                </td>
                  
                <td className="align-middle">
                <table>
                    <tbody>
                      <tr>
                        <td>
                          <b>Name</b>
                        </td>
                        <td>
                          {item.name}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Card ID</b>
                        </td>
                        <td>
                          {item.cardId}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>type </b>
                        </td>
                        <td>
                          {item.type}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>cost </b>
                        </td>
                        <td>
                          {item.cost}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>attack </b>
                        </td>
                        <td>
                          {item.attack}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>health </b>
                        </td>
                        <td>
                          {item.health}
                        </td>
                      </tr>
                    </tbody>
                  </table>



			<div className= "row align-middle">
				<div className ="col-12 text-center" >
					<h1 >{card.name}</h1>		
					<p className="mb-0 " > {card.rarity} {card.race}</p>
					<center>
					<table>
						<tr>
						<td>
							<img src = {img} alt = {img} />
						</td>
						</tr>
						
						<td>
							<p className="mb-0 "> From set: {card.cardSet} </p>
							<p className="mb-0 "> Artist: {card.artist} </p>
							<p className="mb-0 "> {card.flavor}</p>
						</td>
					
					</table>
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