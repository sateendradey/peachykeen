import React, { Component } from 'react';

class Main extends Component {
	
	
	state = {
		restaurants: []
	};
	
	 listHTML = '';
	
	fetch('/restaurants')
		.then(res => res.json())
		.then(restaurants => this.setState({ restaurants }));
		.then(res.forEach(function(item) {
			listHTML += '<li>' + item.name + '</li>';
		});)
		/*
	document.getElementById("restaurants-list").innerHTML = '<ul>' + listHTML + '</ul>';
	 */ 
  render() {
    return (
	<React.Fragment>
      <div className="App">
		Main
      </div>
	  <div id="restaurants-list">
	  </div>
	</React.Fragment>
    );
  }
}

export default Main;
