import React, { Component } from "react";
import MenuPrintout from "../MenuPrintout/MenuPrintout";
import DinnerDoneHeader from "../DinnerDoneHeader/DinnerDoneHeader";

// Master component for the printout view
class Overview extends Component{
	render(){
		return(
			<div>
					<DinnerDoneHeader/>
					<MenuPrintout/>
				
			</div>
			);
	}

}

export default Overview;