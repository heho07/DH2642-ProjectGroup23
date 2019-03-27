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
      searchResult: null,
      loading: true,
      filter:this.props.filter,
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    if (this.state.filter === "") {
      return;
    }
      modelInstance.searchCards(this.state.filter).then(
        results =>{ 
          console.log(results);
          this.setState({
            loading: false, 
            searchResult: results
          });
        }
      ).catch(
        e => this.setState({
          loading:null, 
          status:"ERROR",
        })
      );
  }

  
  handleClickOnCard(obj, destination){
    modelInstance.addCardToDeck(obj, destination);
  }

  handleStoreCard(obj){
    modelInstance.storeCard(obj);
  }
// Creates HTML containing information about the cards found in the search
// This function could be generalized into it's own class so that it can more easily be used elsewhere
  showCard(){
    return(
      <div>
        <table class ="table">
          <tbody>
            {this.state.searchResult.map((item, i) => {
              // if the card is valid we return information about it 
              if (item.name !== undefined & item.img !== undefined & item.health !== undefined & item.attack !== undefined & item.cost !== undefined) {
                let img =null;
                // Due to the webserver needing a secure (https://) source we parse the insecure (http) image from
                // our API into a webserver which returns a secure link to the image
                if (item.img != null){
                  img = "https://images.weserv.nl/?url=" + item.img.replace("http://", "");
                }              
                return(
                    <tr key = {item.cardId}>
                    <div className="resultImage">
                    <td class="align-middle"><img src = {img} alt = {img} onError={e=>{e.target.onerror=null; e.target.src = "https://t3.ftcdn.net/jpg/01/20/55/62/500_F_120556266_mRv3efLLQlc8m3NcVJG7jAIARhBoATpn.jpg"}}/></td>
                    </div>
                    <td class="align-middle">{"name: " + item.name}</td>
                    <td class="align-middle">{"id: " + item.cardId}</td>
                    <td class="align-middle">{"type: " + item.type}</td>
                    <td class="align-middle">{"cost: " + item.cost}</td>
                    <td class="align-middle">{"attack: " + item.attack}</td>
                    <td class="align-middle">{"health: " + item.health}</td>
                    <td class="align-middle"><button className="btn btn-dark" id="addButton" onClick = {() => this.handleClickOnCard(item, "user")}>Add to user</button></td>
                    <td class="align-middle"><button className="btn btn-dark" id="addButton" onClick = {() => this.handleClickOnCard(item, "opponent")}>Add to opponent</button></td>
                    <td class="align-middle"><Link to = "/storeDetail"><button onClick = {() => this.handleStoreCard(item)}>View this card</button></Link></td>
                  </tr>
                );
              }
              else{
                // if the card isn't valid we don't want to show anything
                return false;
              }
            })}
          </tbody>
        </table>
  
      </div>

    );
  }

// The HTML to be rendered on the page
  render(){
    let information = null;
    // Checks if we are loading or not using the components state
    switch(this.state.loading){
      case true:
        information = <p>loading...</p>;
        break;
      case false:
        information = this.showCard();
        break;
      default:
        information = <p>Something went wrong</p>;
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
