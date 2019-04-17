
// The code is now implemented as a class - this way we can store values in the object instance
// variables are stored as attributes (accessed as this.XXXX) and functions are now methods
// and need to be called with this.METHODNAME
// import firebase from "firebase";
    // Required for side-effects
// import firestore from "firebase/firestore";
// import firebase from "firebase/app";

class firebaseClass{
  constructor(){
    this.firebase = window.firebase;
    // this.firestore = window.firebase.firestore;
    this.db = null;
    this.ui = new window.firebaseui.auth.AuthUI(this.firebase.auth());
  }

  initialize(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAmqh0ZvtGMQIBKXfRVRprwUOIw9hJtsJc",
      authDomain: "dh2642-cf885.firebaseapp.com",
      databaseURL: "https://dh2642-cf885.firebaseio.com",
      projectId: "dh2642-cf885",
      storageBucket: "dh2642-cf885.appspot.com",
      messagingSenderId: "1034941870756"
    };
    this.firebase.initializeApp(config);

    this.db = firebase.firestore();

    window.firebaseui.start('#firebaseui-auth-container', {
    signInOptions: [
      this.firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
    });

    console.log("fb initialized");
  }
 
  addCard(cardId, price){
    this.db.collection("cards").add({
      cardId: cardId,
      price: price
    })
    .then(function(docRef) {
      console.log("Document written with ID: " , docRef.id);
    })
    .catch(function(error){
      console.log("Error adding document: ", error);
    });
  }

  tryAdd(){
    this.db.collection("users").add({
      first: "Herman",
      last: "Högman Ording",
      born: 1995
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

  tryRead(){
    this.db.collection("cards").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let res = (`${doc.id} => ${doc.data()}`);
        console.log(doc.data());
    });

    let userCollection = this.db.collection("users");
    let query = userCollection.where('first', '==', 'Ada');
    console.log(query);
});
  }

}

// bind an instance of the above class to the window object
// this way we can access it from everywhere
window.firebaseClass = new firebaseClass();