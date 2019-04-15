import React, { Component } from "react";
import { Link } from "react-router-dom";

// importing the modelInstance directly (as opposed to passing it as a prop)
// this is easier because it makes the component less dependent on the way it is implemented from its parents.
import modelInstance from "../data/Model";



// Renders HTML for the search results.
// What filter to search for is passed to it from its parent component (this.props.filter)
class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: this.props.searchResult,
      status: true,
      errorMessage:null,
      filter:this.props.filter,
      field: this.props.field,
      reverseSort: this.props.reverseSort,
    };
  }
//
  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    if (modelInstance.getSearchedCards() === undefined || modelInstance.getSearchedCards().length === 0) {
      // only do this if we don't already have a search result loaded in

    
      this.setState({loading:true}, () =>
        modelInstance.searchCards(this.state.filter).then(
          results =>{ 
            this.setState({
              loading: false, 
              // searchResult: results
            });
            modelInstance.setSearchedCards(results);
          }
        ).catch(
          e => {
            // if the API query returns an error we save the error status and the error message
            // and later show it to the user
            this.setState({
              loading:null, 
              status: e.status,
              errorMessage: e.statusText,
            });
            console.log(e);
          }
        )
      );
    }
    else{
      // if we already have some result saved since before
      this.setState({loading:false});
    }
  }

  componentWillMount(){
    modelInstance.addObserver(this);
  }

  componentWillUnmount(){
      modelInstance.removeObserver(this);
  }

  update(){
    this.setState({
      searchResult:modelInstance.getSearchedCards(),
    });
  }  

  
  handleClickOnCard(obj, destination){
    modelInstance.addCardToDeck(obj, destination);
  }

  handleStoreCard(obj){
    modelInstance.storeCard(obj);
  }

  sort(){
    this.props.sort();
  }


  
// Creates HTML containing information about the cards found in the search
// This function could be generalized into it's own class so that it can more easily be used elsewhere
  showCard(){
    // let searchedCards = []; 
    // if(this.state.field !== "")
    // {
    //   // this.state.searchResult.sort(this.sortCard(parseFloat)); //for everything numbers
    //   this.sort(); // for name
    // }
    return(
      <div className = "row">
          {this.state.searchResult.map((item, i) => {
            // if the card is valid we return information about it 
            // searchedCards.push(item); // add searched cards to model
            // if(!item.collectible){
            //   // restrict the cards a bit to only show collectibles
            //   item.name = undefined;
            // }
            if (item.name !== undefined & 
                item.img !== undefined & 
                item.health !== undefined & item.health > 0 &
                item.attack !== undefined & item.attack > 0 &
                item.cost !== undefined) {
              let img =null;
              // Due to the webserver needing a secure (https://) source we parse the insecure (http) image from
              // our API into a webserver which returns a secure link to the image
              if (item.img != null){
                img = "https://images.weserv.nl/?url=" + item.img.replace("http://", "");

              }
            
                            
                return(
                  <div className = "col-sm-4 teststyle">
                    <center>
                      <img className="storeCardImage" src = {img} alt = {img} onError={e=>{e.target.onerror=null; e.target.src = "https://i.imgur.com/ZI9QakW.png"}}/>
                      <Link to = {"/storeDetail?id="+item.cardId}><button className="btn btn-dark"  onClick = {() => this.handleStoreCard(item)}>View this card</button></Link> 
                    </center>
                  </div>


                );
              }
              else{
                // if the card isn't valid we don't want to show anything
                return false;
              }
            })}
      </div>
    );
  }

// The HTML to be rendered on the page
  render(){
    let information = null;
    // Checks if we are loading or not using the components state
    switch(this.state.loading){
      case true:
        information = <center><div className = "loader">loading</div></center>;
        break;
      case false:
        information = this.showCard();       
        break;
      default:
        information = <div>
                        <p>Something went wrong. Error message: </p>
                        <p>{this.state.status}</p>
                        <p>{this.state.errorMessage}</p>
                      </div>;
        break;
    }
    return(
      <div>
        {information}
      </div>
    );
  }
}



export default SearchResults;
