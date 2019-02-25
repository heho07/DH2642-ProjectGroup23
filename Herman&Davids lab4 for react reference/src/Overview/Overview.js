import React, { Component } from "react";
import MenuOverview from "../MenuOverview/MenuOverview";
import DinnerDoneHeader from "../DinnerDoneHeader/DinnerDoneHeader";

// Master component for the overview view
class Overview extends Component{
	render(){
		return(
			<div>
					<DinnerDoneHeader/>
				
					<MenuOverview/>
				
			</div>
			);
	}

}

export default Overview;