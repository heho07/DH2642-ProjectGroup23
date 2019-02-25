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
		super();
		
	}

	// Returns the promise of a JSON object containing the results from the search
	searchCards(filter) {
		const url = `${BASE_URL}/cards/search/`+filter;
    	console.log("Searched for cards with keyword " + filter);
    	return fetch(url, httpOptions).then(this.processResponse);

  	}

  	// Creates a JSON object from a response
  	processResponse(response) {
	    if (response.ok) {
	      return response.json();
	    }
	    throw response;
  	}
}

const modelInstance = new Model();
export default modelInstance;