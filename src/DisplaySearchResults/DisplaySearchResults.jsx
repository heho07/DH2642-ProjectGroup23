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
      searchResult: modelInstance.getSearchedCards(),
      status: true,
      errorMessage:null,
      filter:this.props.filter,
      field: "cost",
      reverseSort: true,
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    
    // a dummy solution since the API can't query for undefined or empty space
    // this solution is not used any more 
    let searchItem;
    if (this.state.filter === "") {
      const searchTerms = ["legendary", "knight", "kobold", "murloc", "dragon"];
      searchItem = searchTerms[Math.floor(Math.random() *searchTerms.length)];
    }
    else{
      searchItem = this.state.filter;
    }
    this.setState({loading:true});
    modelInstance.searchCards(searchItem).then(
      results =>{ 
        console.log(results);
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
    );
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


  sortCard(primer){
    // reverse indicates what order we're sorting in.
    // Primer indicates how the sort is made. Has to be a way of sorting such as parseFloat etc
    // Field indicates what we're sorting by 
    let key = primer ? x => {return primer(x[this.state.field])} : x => x[this.state.field];
    let reverse;
    !(this.state.reverseSort) ? reverse = 1: reverse = -1;
    return (a,b) =>{
      return a = key(a), b = key(b), reverse * ((a>b)-(b>a));
    }
  }
// Creates HTML containing information about the cards found in the search
// This function could be generalized into it's own class so that it can more easily be used elsewhere
  showCard(){
    // let searchedCards = []; 
    if(this.state.field !== "")
    {
      this.state.searchResult.sort(this.sortCard(parseFloat)); //for everything numbers
      //this.state.searchResult.sort(this.sortCard(function(a){return a.toUpperCase()})); // for name
    }
    return(
      <div>
        <table className ="table">
          <tbody>
            {this.state.searchResult.map((item, i) => {
              // if the card is valid we return information about it 
              // searchedCards.push(item); // add searched cards to model
              if (item.name !== undefined & item.img !== undefined & item.health !== undefined & item.attack !== undefined & item.cost !== undefined) {
                let img =null;
                // Due to the webserver needing a secure (https://) source we parse the insecure (http) image from
                // our API into a webserver which returns a secure link to the image
                if (item.img != null){
                  img = "https://images.weserv.nl/?url=" + item.img.replace("http://", "");
                }              
                return(
                  <tr key = {item.cardId}>
                      
                    <td className="align-middle resultImage">
                      <center>
                        <img src = {img} alt = {img} onError={e=>{e.target.onerror=null; e.target.src = "https://t3.ftcdn.net/jpg/01/20/55/62/500_F_120556266_mRv3efLLQlc8m3NcVJG7jAIARhBoATpn.jpg"}}/>
                      </center>
                    </td>
                      
                    <td className="align-middle">
                     <table>
                        <tbody>
                          <tr>
                            <td><b>Name</b></td>
                            <td>{item.name}</td>
                          </tr>
                          <tr>
                            <td><b>Card ID</b></td>
                            <td>{item.cardId}</td>
                          </tr>
                          <tr>
                            <td><b>type </b></td>
                            <td>{item.type}</td>
                          </tr>
                          <tr>
                            <td><b>cost </b></td>
                            <td>{item.cost}</td>
                          </tr>
                          <tr>
                            <td><b>attack </b></td>
                            <td>{item.attack}</td>
                          </tr>
                          <tr>
                            <td><b>health </b></td>
                            <td>{item.health}</td>
                          </tr>
                        </tbody>
                      </table>
                    
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
                      <br />
                      <button className="btn btn-dark" id="gameButton" onClick = {() => this.handleClickOnCard(item, "user")}>Add to user</button> <br />
                      <button className="btn btn-dark" id="gameButton" onClick = {() => this.handleClickOnCard(item, "opponent")}>Add to opponent</button><br />
                      <Link to = "/storeDetail"><button className="btn btn-dark"  onClick = {() => this.handleStoreCard(item)}>View this card</button></Link>
                    </td>

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
