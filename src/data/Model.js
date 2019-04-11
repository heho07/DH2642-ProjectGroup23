import ObservableModel from "./ObservableModel";


// Contains the base url on which we can add specific requests to the API
const BASE_URL = "https://omgvamp-hearthstone-v1.p.rapidapi.com/";

// Contains the necessary header with the API key
const httpOptions = {
  headers: { "X-RapidAPI-Key": 'OuJEVSyxuEmshw7n4cyNBgjwfkB0p1OcPz9jsnrYIZqg8U80Nu' }
};

class Model extends ObservableModel{

	// the Model inherits everything from the ObservableModel file (from Lab4) so that we easily can add obsevers to the model
	constructor(){
		// super(); needs to be called before we define attributes to the class. This is due to the way JS inheritance works. 
		// super(); means the Model inherits stuff from ObservableModel (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)
		super();
		this.usersCards = [];
		this.opponentsCards = [];
		this.storedCards = {};
		this.searchedCards = [];
		this.filter="";
	}

	// Checks if the card is already in the usersCards array
	// otherwise adds it
	// This method is very likely subject to change, more or less a copy from the dinnerPlanner methods
	// Could possibly be used to add to cart, or something. Adding to the users selection should probably be done via blockchain 
	addCardToDeck(obj, destination){
		let cards = null;
		if (destination === "user") {
			cards = this.getUsersCards()
		}
		else if (destination === "opponent") {
			cards = this.getOpponentsCards();
		}
		else{
			//destination faulty
			return false;
		}

		for (var i = cards.length - 1; i >= 0; i--) {
			if (cards[i].cardId === obj.cardId) {
				return false;
			}
		}
		cards.push(obj);
		this.notifyObservers();
	}

	getUsersCards(){
		return this.usersCards;
	}

	getOpponentsCards(){
		return this.opponentsCards;
	}

	clearUsersCards(){
		this.usersCards = [];
		this.notifyObservers();
	}

	clearCards(destination){
		switch(destination){
			case 'opponent':
				this.opponentsCards = [];
				break;
			case 'user':
				this.usersCards = [];
				break;
			default:
				this.opponentsCards = [];
				console.log("something calling clearCards in Model.js had the wrong input parameter");
				break;
		}
		this.notifyObservers();
	}

	// Receives an array of JSON objects containing lots of different cards
	// this function searches the array for cards that are valid (i.e. it has values for attack, health, and a name)
	// this search continues until ten cards have been found or until the search has looped 1000 times (to avoid eternal loop)
	selectRandomCardsForOpponent(objectArray){
		let toRet = [];
		let currentObject = null;
		let counter = 0;
		let addBoolean = true;
		while(toRet.length < 10){
			currentObject = objectArray[Math.floor(Math.random()*objectArray.length)]; 
			try{
				if ( currentObject.attack !== undefined && currentObject.health !== undefined  && currentObject.name !== undefined && (currentObject.attack > 0 && currentObject.health > 0)) {
					if (toRet.length === 0) {
						toRet.push(currentObject);
					}
					else{
						for (var i = toRet.length - 1; i >= 0; i--) {
							if(toRet[i].cardId === currentObject.cardId){
								addBoolean = false;
							}
						}
						if (addBoolean) {
							toRet.push(currentObject);
							addBoolean = false;
						}
					}
				}
				addBoolean = true;
			}
			catch (error) {
				console.log(error);	
			}
			counter++;
			if (counter > 1000) {
				//just a failsafe so this doesn't loop forever
				break;
			}
		}
		return toRet;
	}

	// Return the promise of a JSON object containing the cards based on what quality they have
	// Quality ranges from: Free -> Common -> Rare -> Epic -> Legendary
	searchDeckByQuality(quality){
		const url = `${BASE_URL}/cards/qualities/`+quality;
		return fetch(url, httpOptions).then(this.processResponse);
	}

	// Returns the promise of a JSON object containing the results from the search
	searchCards(filter) {
		const url = `${BASE_URL}/cards/search/`+filter;
    	console.log("Searched for cards with keyword " + filter);
    	return fetch(url, httpOptions).then(this.processResponse);

  	}

  	// returns the promise of a JSON object containing all the cards
  	getAllCardsFromAPI(){
  		const url = `${BASE_URL}/cards`;
  		return fetch(url, httpOptions).then(this.processResponse);
  	}

  	// Creates a JSON object from a response
  	processResponse(response) {
	    if (response.ok) {
	      return response.json();
	    }
	    throw response;
	  }

	storeCard(object) {
		console.log(object);
		this.storedCard = object;
	}
	getCard(id) {
		return this.storedCard;
	}
	  
	setSearchedCards(array){
		this.searchedCards = array;
		console.log(this.searchedCards);
		this.notifyObservers();
	}

	clearSearchedCards(){
		this.searchedCards = [];
		this.notifyObservers();
	}

	getSearchedCards(){
		return this.searchedCards;
	}

	setFilter(filter){
		this.filter = filter;
		this.notifyObservers();
	}

	getFilter(){
		return this.filter;
	}

}
const modelInstance = new Model();
export default modelInstance;