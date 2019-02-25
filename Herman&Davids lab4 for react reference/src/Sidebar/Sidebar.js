import React, { Component } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import Media from 'react-media';


class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getFullMenu(),
      showMenu : false,
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getFullMenu(),

    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
  };


  // Handles user input click on remove dish button
  handleClick(dish){
    this.props.model.removeDishFromMenu(dish.id);
  }


  // This function renders the chosen menu as a table as well as the confirm button linking you forward
  renderMenu(){
    return (
        <div>
          <table>
            <tbody>
              {this.state.menu.map((item, i) => {
                  return(
                    <tr key = {item.id}>
                      <td>{item.title}</td>
                      <td>{item.extendedIngredients.length * this.state.numberOfGuests}</td>
                      <td id = "deleteButton" onClick = { () => this.handleClick(item)} >{"X"}</td>
                    </tr>
                    );
                  })
              } 
              <tr>
                <td> <b>{"Total price: " + this.props.model.getTotalMenuPrice()+" SEK"} </b></td>
              </tr>
            </tbody>
          </table>
          <center>
            <Link to="/overview">
              <button>Confirm dinner</button>
            </Link>
          </center>
        </div>
      );
  }


  


  // Såhär gjorde vi i lab3 med bootstrap. Fick det ej att funka och fattar inte hur det ska funka så jag testade en egen grej metoden nedanför
  renderMobileViewOldWay(){
    return(
      <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseTwo"
              onClick = {()=>console.log("clicked button")}>
              button
              </button>
            </h5>
          </div>
          <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div className="card-body">
              {this.renderMenu()}
              <center>
                <Link to="/overview">
                  <button>Confirm dinner</button>
                </Link>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }


  // Renders a button which will allow the user to hide or show the menu. 
  // Wether or not the menu should be shown or not is kept track of via
  // the components state "showMenu". 
  // When the user clicks the button the state will inverse and thus showing/hiding the menu
  renderMobileView(){
    return(
      <div>
        <button onClick = {() => this.setState({showMenu: !this.state.showMenu})}>
          show/hide menu
        </button>
        {this.state.showMenu ? this.renderMenu() : <div></div>}
      </div>  
    );
  }

  // What renders when this compent is used
  render() {
    return (
      <div className="Sidebar">
        <h3>
          People:
        </h3>
        <p id = "numberOfGuestsInput">
          <input
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
          />
        </p>
        <p>
          Total number of guests: {this.state.numberOfGuests}
        </p>
        
        {
          // Media query is a react npm package allowing you to access the CSS media property
          // and that way we can adapt the view to the screen width of the user
          // https://github.com/ReactTraining/react-media?fbclid=IwAR37jE7hbUIGr0up0aUDxoC-y3YesGtIAqEQHNj1ZXzt6K8hUBhwNQOwlMk
        }
        
        <Media query="(max-width:599px)">
          {queryBoolean =>
           queryBoolean ? (
              <div>{this.renderMobileView()}</div>
            ) : (
              <div>{this.renderMenu()}</div>
            )

          }
          </Media>
      </div>
    );
  }
}

export default Sidebar;
