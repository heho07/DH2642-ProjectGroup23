import React, { Component } from "react";
import { Link } from "react-router-dom";
//import * as Connect from "../connect.js";

// importing the modelInstance directly (as opposed to passing it as a prop)
// this is easier because it makes the component less dependent on the way it is implemented from its parents.
import modelInstance from "../data/Model";



// Renders HTML for the search results.
// What filter to search for is passed to it from its parent component (this.props.filter)
class BlockStoneConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account : "click the button",
      avCards : 0,
    }
  }


 // <div>Address: <span id="walletAddress">---</span></div>
 //    <div>Number of cards: <span id="cardsNum">---</span></div>
 //    <div>Cards of store (<span id="storeCardsNum">---</span>): <span id="storeCards">---</span></div>
 //    <div>Cards of user (<span id="userCardsNum">---</span>): <span id="userCards">---</span></div>
 //    <div>
 //      <button id="btn0" data-id="0" value="1000000000000000000">name0</button>
 //      <button id="btn1" data-id="1" value="2000000000000000000">name1</button>
 //      <button id="btn2" data-id="2" value="3000000000000000000">name2</button>
 //    </div>
 
// The HTML to be rendered on the page
  handleClick(){
    //let res = window.ConnectClass.getInfo(window.ConnectClass.contract, window.ConnectClass.account );
    const myAcc = window.ConnectClass.getNetIdAndAccount();
    myAcc.then((e) => this.setState({
      account :  e,
    }))
    .catch((err) => console.log(err));

    const test = window.ConnectClass.testAddCard(window.ConnectClass.contract);
    test.then((e) => console.log("does resolve??? ", e))
    .catch((err) => console.log("not resolve: ",err));

    const storeCards = window.ConnectClass.getStoreCards(window.ConnectClass.contract);
    storeCards.then((e) => console.log(e))
    .catch((err) => console.log(err));
    
  }


  render(){
    console.log(window);
    return(
      <div>
        <button onClick = {() => this.handleClick()}>ANROPAR CONNECT</button>
  
        <div>Address: <span id="walletAddress">{this.state.account}</span></div>
        <div>Number of cards: <span id="cardsNum">---</span></div>
        <div>Cards of store (<span id="storeCardsNum">{this.state.avCards}</span>): <span id="storeCards">---</span></div>
        <div>Cards of user (<span id="userCardsNum">---</span>): <span id="userCards">---</span></div>
        <div>
          <button id="btn0" data-id="0" value="1000000000000000000">name0</button>
          <button id="btn1" data-id="1" value="2000000000000000000">name1</button>
          <button id="btn2" data-id="2" value="3000000000000000000">name2</button>
        </div>
       </div>


       );
  }
}



export default BlockStoneConnection;
