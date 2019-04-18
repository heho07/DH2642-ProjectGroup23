import React, { Component } from "react";
//import * as Connect from "../connect.js";

// importing the modelInstance directly (as opposed to passing it as a prop)
// this is easier because it makes the component less dependent on the way it is implemented from its parents.
import modelInstance from "../data/Model";



// Renders HTML for the search results.
// What filter to search for is passed to it from its parent component (this.props.filter)
class BlockStoneConnection extends Component {



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
    //res.then((e) => console.log(e));
    let cardArr = [];
    let res = window.ConnectClass.getStoreCards(window.ConnectClass.contract);
    res.then( (e) => {
      e.forEach(token => {
        let meta = window.ConnectClass.getCardMeta(window.ConnectClass.contract, token);
        meta.then( k => {
          cardArr.push({"price": window.web3.utils.fromWei(k.price), "nameId": window.web3.utils.hexToAscii(k.nameId)})
          console.log(cardArr);
          });
      });
    });

  }

  getCardsFromBlockChain(){
    modelInstance.getCardsInBlockChain().then((res) => {
      console.log(res);
    });
    // console.log(res);
  }

  testFunc(){
    window.ConnectClass.getInfo(window.ConnectClass.contract, window.ConnectClass.account).then(res => console.log(res));
  }

  usersCardsFromBlockChain(){
    let cardIdArray = [];
    window.ConnectClass.getAllCards().then( async (tokenIdArray) => {
      console.log(tokenIdArray);
      for (const tokenId of tokenIdArray){
        await window.ConnectClass.getCardMeta(tokenId).then( (metaData) => {
          cardIdArray.push(metaData);
        });
      }
      console.log(cardIdArray);
    });
  }


  render(){
    return(
      <div>
        <button onClick = {() => this.handleClick()}>ANROPAR CONNECT</button>
        <button onClick = {() => modelInstance.getAllCardsFromAPI().then((res) => {
            let arr = [];
            Object.values(res).forEach((category) =>{
              category.forEach((card) => {
                if (card.cardId &&
                  card.cardId !== undefined &&
                  card.cardId.length <= 16 &&
                  card.attack &&
                  card.attack !== undefined &&
                  card.health &&
                  card.health !== undefined &&
                  card.rarity &&
                  card.rarity !== undefined &&
                  card.name &&
                  card.name !== undefined) {
                  arr.push(card);
                }
              });
            });

            console.log("card number: "+arr.length);

            const rarity = {
              "Free": 1,
              "Common": 2,
              "Rare": 3,
              "Epic": 4,
              "Legendary": 5
            }
            let nameIds = [];
            let prices = [];

            arr.forEach((card) => {
              // push cardId
              let id = window.web3.utils.padRight(window.web3.utils.asciiToHex(card.cardId), 32);
              nameIds.push(id);
              // calculate price and push it
              let price =  0.2*card.health + 0.1*card.attack + 2*rarity[card.rarity];
              prices.push(window.web3.utils.toWei(String(price)));
            });

            console.log(nameIds);
            console.log(nameIds.length);
            console.log(prices);
            console.log(prices.length);
            console.assert(prices.length === nameIds.length);
          })
        }>all cards</button>

        <button onClick = {() => this.getCardsFromBlockChain()}>get cards from blockchain to model</button>
        <button onClick = {() => modelInstance.getblockChainCards()}>view blockchaincards in model</button>
        <button onClick = {() => this.usersCardsFromBlockChain()}>Get users cards from blockchain</button>
        <button onClick = {() => this.testFunc()}>testFunc</button>
      </div>
    );
  }
}



export default BlockStoneConnection;
