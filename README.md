# DH2642_VT19_PG23

The git repository for project group 23 in the course DH2642 at KTH VT19

## Short description of the project

Our project uses the HearthStone API to implement three  major functions. My Collection displays HearthStone cards that are in your collection. VS Mode lets you duel other cards and fight until one collection is defeated. Store lets the user browse the cards that are available through the API and through the implementation of Blockchain, users can buy cards from the store with digital currency.

## Using the backend

### Summary

In this project, a blockchain is used as the main database. By using an extension such as Metamask, the user functinoaly has an account on the webpage where information is stored. In addition, there is a specific account for the store where further information is stored.

### How it works

The information on the store account are objects with a cardId property and a price property.  These have been manually inputed to the store, using the API. The cardId is therefore the same as in the API, while the price is determined by a function of the cards other attributes.

When the user browses the store, the information in the store is fetched and subsequently queried against a simultaneous fetch from the API in order to get further data such as image. The control between API and BlockChain is done by iterating through the API call results and directly mapping them to corresponding BlockChain entries via the cardId property.

When the user purchases the card, the ownership will transfer from the store to the  user. This is a permanent change, so the user is now owner of that card whenever the user logs in. When the user subsequently navigates to the collection or to the game mode, the cards displayed will be fetched in a similar manner to the store however it is compared to the users account and not the store.

### Testing the code

In order to properly test the code, the user needs an account on Metamask. Make sure it is on the RinkebyTestNetwork. Moreover, in order to test the trasaction functionality, the account requires Ether. To load the account with Ether for testing, follow the instructions here: https://faucet.rinkeby.io/.  Lastly, when the extension is connected and in place, make sure that it is running on the *Rinkeby Test Network*.

In order to demo the game mode without a metamask account, there's an option to recieve a temporary demonstation deck in the information popup button.

## Project file structure

### contracts

- **blockstone.sol** is the code working on the blockchain as a database and all operations that are allowed, including purchase, transfer, and so on.

### public

- **Index.html** is the root document for our React app. In there we create an app component

- **ConnectClass.js** communicates with the blockchan

## src 

- **BlockStoneConnection.jsx** a react compoonent that uses ConnectClass.js to communicate with the blockchain.

- **App.js** In here we define what screen to show depending on the URL, this is done via Route. From these Routes we can reach:

- **Welcome.js** If nothing special is specified we show this screen, which is basically the home screen.

- **SearchScreen.js** is the main component for the store page. This component has two children:

    - **SearchBar.js** is the component that takes an input and prompts the model to perform an API query with the input

    - **DisplaySearchResults.js** showcases these search results. From this component we can get detail about the cards in the child component:

        - **StoreDetail.js** which presents the user with information about the specific card chosen

- **MyCollection.js** Showcases the cards in the users deck.

- **VersusMode.js** contains the code for the fight between the cards.

**Model.js** contains all code communicating with the API and handling that data, with the blockchain data aswell.

**ObservableModel.js** is the code handling observers to the model.
