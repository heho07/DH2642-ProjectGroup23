# DH2642_VT19_PG23
The git repository for project group 23 in the course DH2642 at KTH VT19

## YOU NEED TO RUN "npm install" in the main folder before running. This is due to the folder "node_modules" being ignored by git to save space on git.

## How to run:
- clone the repository
- make sure you have npm installed on your computer 
- run "npm install" in the root folder (npm will in turn look at the "package.json" file to see which dependencies it needs to install)
- run "npm start" to deploy

## Short description of the project

Our project uses the HearthStone API to implement three  major functions. My Collection displays HearthStone cards that are in your collection. VS Mode lets you duel other cards and fight until one collection is defeated. Store lets the user browse the cards that are available through the API and through the implementation of Blockchain, users can buy cards from the store with digital currency.

## What we have done so far

So far we have implemented a way of searching for cards and using the cards in a simple game. The skeleton is done for the application. However in its current state, it is mostly a rough outline of the finished project. In the current iteration, users can search the store and add a card to the user's collection. These cards can be view under the My Collection tab. If cards are added to the user and to the opponent through the Store, then the user can enter the VS Mode and battle with these cards. Once again, in this rendition it looks more like a prototype than a finished product (see How to move forward). If a user wishes to view a specific card in the Store, the user is taking to a seperate screen to purchase the cards he or she wants.

## How to move forward

In the future we need to make everything look more coherent and finished visually. This also applies to mobile view that needs to adapted (especially the Store screen). We are going to link the front-end application to our Blockchain backend allowing users to have accounts and purchasing cards to their accounts. The VS Mode will be polished and potentially have a drag & drop feature in it so that you can drag the card you want to fight on top of another card.

Concerning how the information is stored, the plan as of now is to implement a API-call for all the cards and parse the necessary information to store on the blockchain. For instance, a card has information like ID/name and price determined by rarity stored in the Blockchain. Then, this information stored in the blockchain enables the store to function.

## Project file structure

The front-end is written in React.

**Index.js** is the root document for our React app. In there we create an app component

**App.js** In here we define what screen to show depending on the URL, this is done via Route. From these Routes we can reach:

- **Welcome.js** If nothing special is specified we show this screen, which is basically the home screen.

- **SearchScreen.js** is the main component for the store page. This component has two children:

    - **SearchBar.js** is the component that takes an input and prompts the model to perform an API query with the input

    - **DisplaySearchResults.js** showcases these search results. From this component we can get detail about the cards in the child component:

        - **StoreDetail.js** which presents the user with information about the specific card chosen

- **MyCollection.js** Showcases the cards in the users deck.

- **VersusMode.js** contains the code for the fight between the cards.

**Model.js** contains all code communicating with the API and handling that data.

**ObservableModel.js** is the code handling observers to the model.

**contracts/blockstone.sol** is the code working on the blockchain as a database and all operations that are allowed, including purchase, transfer, and so on.
