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
		if (localStorage.getItem("usersCards") != null) {
			try{
				this.usersCards = JSON.parse(localStorage.getItem("usersCards"));
			}
			catch(err){
				console.log("Failed to load usersCards from localStorage with the following error message:");
				console.log(err);
				this.usersCards = [];
			}
		}
		else{
			this.usersCards = [];
		}
		if (localStorage.getItem("opponentsCards") != null) {
			try{
				this.opponentsCards = JSON.parse(localStorage.getItem("opponentsCards"));
				console.log("Successfully loaded opponentsCards form localStorage!");
			}
			catch(err) {
				console.log("Failed to load opponentsCards from localStorage with the following error message:");
				console.log(err);
				this.opponentsCards = [];
			}
		}
		else{
			this.opponentsCards = [];
		}

		// Checking the localStorage for filter
	    if (localStorage.getItem("filter") != null) {
	      try{
	        this.filter = localStorage.getItem("filter");
	        console.log("Successfully loaded filter from localStorage!");
	      }
	      catch(err){
	        console.log("Failed to load filter from localStorage with the following error message");
	        console.log(err);
	        this.filter = "";
	      }
	    }
	    else{
	      this.filter = "";
	    }

	    // Checking the localStorage for searchResults
	    if (localStorage.getItem("searchedCards") != null) {
	      try{
	        this.searchedCards = JSON.parse(localStorage.getItem("searchedCards"));
	        console.log("Successfully loaded searchedCards from localStorage!");
	      }
	      catch(err){
	        console.log("Failed to load searchedCards from localStorage with the following error message");
	        console.log(err);
	        this.searchedCards = [];
	      }
	    }
	    else{
	      this.searchedCards = [];
	    }

		this.storedCards = {};
		this.cardsFromStore = [];
	    this.blockChainCards = [];
	    // calling the method that gets card info from the blockchain when the model initialized
	    // this.getCardsInBlockChain();

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
		if (destination === "opponent") {
			this.setOpponentsCardsLocalStorage();
		}
		this.notifyObservers();
	}

	setOpponentsCardsLocalStorage(){
		localStorage.setItem("opponentsCards", JSON.stringify(this.opponentsCards));
	}
	getUsersCards(){
		return this.usersCards;
	}

	setUsersCards(cardArray){
		this.usersCards = cardArray;
		localStorage.setItem("usersCards", JSON.stringify(this.usersCards));
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
    	return fetch(url, httpOptions).then(this.processResponse);
  	}

	// Returns the promise of a JSON object containing the results from the search
	searchCardsById(filter) {
		const url = `${BASE_URL}/cards/`+filter;
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
		this.storedCard = object;
	}
	getCard(id) {
		return this.storedCard;
	}

//	compareToBlockChain takes an array with objects from the API-call and first filters them by
//	desirable attributes and compares the filtered objects to the ones in the store.
//	Upon success, add the object to the array of objects that gets displayed.
	async compareToBlockChain(array){		
		for (var i = array.length - 1; i >= 0; i--) {
			if(array[i].attack !== undefined && array[i].health !== undefined  && array[i].name && array[i].attack > 0 && array[i].health > 0
				&& array[i].cardId && array[i].cardId !== undefined && array[i].name !== undefined){
					try{
						let tokenId = await window.ConnectClass.getTokenIdbyCardId(array[i].cardId);
						let metaData = await window.ConnectClass.getCardMeta(tokenId);
						let price = window.web3.utils.fromWei(metaData.price);
						array[i].price = price;						
						this.searchedCards.push(array[i]);
					}catch(error){
						console.log(error);
					}
			}
		}
		localStorage.setItem("searchedCards", JSON.stringify(this.searchedCards));

	}
	

	clearSearchedCards(){
		this.searchedCards = [];
		this.notifyObservers();
	}

	setSearchedCards(array){
		array.forEach( card =>{
			if(card.attack >0  && 
				card.health > 0 &&
				card.name &&
				card.cardId) {
					this.searchedCards.push(card);
				}
		})
		this.notifyObservers();
		localStorage.setItem("searchedCards", JSON.stringify(this.searchedCards));
	}

	getSearchedCards(){
		return this.searchedCards;
	}

	setFilter(filter){
		this.filter = filter;
		this.notifyObservers();
		localStorage.setItem("filter", this.filter);
	}

	getFilter(){
		return this.filter;
	}

	//	getCardsInBlockChain connects with the store and gets all the objects in the store
	//	into the model.
	async getCardsInBlockChain(){
		let cardArr = [];
		// wait until this is done before proceeding
		await window.ConnectClass.getStoreCards(window.ConnectClass.contract).then(async (res)=>{
			for (const token of res) {
				// don't exit the for loop before this is done
				await this.getMetaData(token).then((res) => cardArr.push(res));
			}
			// console.log(cardArr);
		}).catch((error) => {
			console.log("error in getCardsInBlockChain");
			console.log(error);
		});
		this.blockChainCards = cardArr;
		return cardArr;

	}


	// Returns the promise of a cardArray containing the cards owned by the current user address
	// also changes the attribute in the model for this
	async getCardFromUserAccount(){
		let cardArr = [];
		// wait until this is done before proceeding
		await window.ConnectClass.getAllCards().then(async (res)=>{
			for (const token of res) {
				// don't exit the for loop before this is done
				let metaData = await this.getMetaData(token);
				let cardFromApi = await this.searchCardsById(metaData.cardId);
				cardFromApi = cardFromApi[0];
				cardFromApi["price"] = metaData.price;
				cardArr.push(cardFromApi);
			}
		}).catch((error) => {
			console.log("error in getCardsFromUserAccount");
			console.log(error);
		});
		this.setUsersCards(cardArr);
		return cardArr;
	}


	// 	getMetaData recieves a token, which represents a specific object. 
	//	It returns the corresponding metadata.
	async getMetaData(token){
		let toRet;
		await window.ConnectClass.getCardMeta(token).then((metaData) => {
			toRet = {"price": window.web3.utils.fromWei(metaData.price), "cardId" : window.web3.utils.toUtf8(metaData.cardId)};
		});
		return toRet;
	}

	getblockChainCards(){
		return this.blockChainCards;
	}

}

var modelInstance = new Model();

export default modelInstance;