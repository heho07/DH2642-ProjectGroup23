import ObservableModel from "./ObservableModel";


const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/69";
const httpOptions = {
  headers: { "X-Mashape-Key": '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767' }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();

    // Checking the localStorage for numberOfGuests
    if (localStorage.getItem("numberOfGuests") != null) {
      try{
        this._numberOfGuests = parseInt(localStorage.getItem("numberOfGuests"),10);
        console.log("Successfully loaded number of guests from localStorage!");
      }
      catch(err){
        console.log("Failed to load number of guests from localStorage with the following error message");
        console.log(err);
        this._numberOfGuests = 4;
      }
    }
    else{
      this._numberOfGuests = 4;
    }

    this.getNumberOfGuests();
    this.dishOfNotice = [];


    // Checking the localStorage for menu
    if (localStorage.getItem("menu")!= null) {
      try{
        this.menu=JSON.parse(localStorage.getItem("menu"));
        console.log("Successfully loaded menu from localStorage!"); 
      }
      catch(err){
        console.log("Failed to load menu from localStorage with the following error message:");
        console.log(err);
        this.menu=[];
      }
    }
    else{
      this.menu=[];
    }
    
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    localStorage.setItem("numberOfGuests", this._numberOfGuests);
    this.notifyObservers();
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes(filter, type) {
    const url = `${BASE_URL}/recipes/search/?query=`+filter+'&type='+type;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  // API call to get information regarding a specific dish
  getDish(id) {
    const url = `${BASE_URL}/recipes/`+id+'/information';
    return fetch(url, httpOptions).then(this.processResponse);
  }

  getFullMenu(){
    return this.menu;
  }

  setDishOfNotice(obj){
    this.dishOfNotice = obj;    
    console.log("chaning dish of notice");
    console.log(this.dishOfNotice);
    console.log(this.getHello());
    this.notifyObservers("clickedDish");
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }


  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  addDishToMenu (obj) {
    var dishToAdd = obj;

    for (var i = this.menu.length - 1; i >= 0; i--) {
      if (parseInt(this.menu[i]["id"], 10) === dishToAdd["id"]){
        // Objektet finns redan i array
        return false;
      }
    }
    this.menu.push(dishToAdd);
    this.notifyObservers("dishAddedToMenu");
    localStorage.setItem("menu", JSON.stringify(this.menu));
  }

  // Removes dish from menu
  removeDishFromMenu (id) {
    for (var j = 0; j < this.menu.length; j++){
      let menuObject = this.menu[j];
      if (parseInt(id, 10) === parseInt(menuObject["id"], 10)){
        var indexNum = j;
        this.menu.splice(indexNum, 1);
        this.notifyObservers("dishRemovedFromMenu");
        localStorage.setItem("menu", JSON.stringify(this.menu));
      }
    }
  }

  // Return the price of a certain dish object 
  // Basically just multiplies the number of ingredients with the number of guests
  getPriceOfDish (obj){
    var numberOfGuests = parseInt(this.getNumberOfGuests(), 10);
    var dishPrice = 0;
    for (var i = obj.extendedIngredients.length - 1; i >= 0; i--) {
      if(obj.extendedIngredients[i].id != null){
        dishPrice += numberOfGuests;
      }
    }
    return dishPrice;
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  getTotalMenuPrice () {
    var menu = this.getFullMenu();
    var totalPrice = 0;
    for (var j = 0; j < menu.length; j++){
      totalPrice += this.getPriceOfDish(menu[j]);
    }
    return totalPrice;
  }



}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
