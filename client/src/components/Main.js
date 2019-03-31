import React, { Component } from 'react';

class Main extends Component {
	
	state = {
		restaurants: [],
		isLoading: false,
	};
	//function to contain the fetch
	componentDidMount() {
		//sets isLoading to true if we want to display some graphics during loading
		this.setState({ isLoading: true});
		//fetch pulls all restaurant data into an array
		fetch('/restaurants')
		.then(res =>res.json())
		.then(resArray=>resArray.forEach(function(item,listHTML=[]) {
			//concatenates the values together for each value in our db
			listHTML =   item.Name.toString() + ', '+ item.Mood.toString()+ ', '+ item.Catering.toString() ;
			//adds each array item into a HTML list item
			document.getElementById("restaurants-list").innerHTML += '<li>' + listHTML + ' catering </li>';
		}))
		this.setState({ isLoading: false});
	}
 
  render() {
    return (
	<React.Fragment>
	<h1> All Restaurants!</h1>
      <div className="App">
      </div>
	  <div >
		<ol id="restaurants-list">
		</ol>
	  </div>
	</React.Fragment>
    );
  }
}

export default Main;
