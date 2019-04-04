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
		.then(resArray=>resArray.forEach(function(item,listHTML=[],listItemNames=[]) {
			//concatenates the values together for each value in our db
			listItemNames = item.Name.toString();
			//adds each array item to a dropdown list
			document.getElementById("restaurants-name").innerHTML += '<option value="'+ listItemNames + '">'+ listItemNames + '</select>'
		}))
		this.setState({ isLoading: false});
	}
	
	pickedRestaurant(selectedRestaurant) {
			document.getElementById("restaurantDeets").open =false;
			document.getElementById("restaurantName").hidden =false;
			selectedRestaurant = document.getElementById("restaurants-name").value;
			document.getElementById("restaurantReviewsText").innerHTML = '<strong>Reviews</strong>'
			//fetch pulls all restaurant data into an array
			fetch('/restaurants')
			.then(res =>res.json())
			.then(resArray=>resArray.filter(function(displayThisOne,selectedRestaurant) {
			selectedRestaurant = document.getElementById("restaurants-name").value;
			return displayThisOne.Name == selectedRestaurant;
			}).forEach(function(item,listHTML=[]) {
				document.getElementById("restaurantName").innerHTML =item.Name.toString();	
				document.getElementById("restaurantMood").innerHTML ='Mood: '+item.Mood.toString();
				document.getElementById("restaurantRating").innerHTML ='Rating: '+item.Rating.toString() + ' Outta 5';
				document.getElementById("restaurantAddress").innerHTML ='<strong>Address</strong> <br>'+item.Street.toString() + '<br>' + item.City.toString()+ ', ' +item.State.toString()+ '<br>' +item.Zip.toString();
				item.Reviews.forEach(function(xitem) {
					document.getElementById("restaurantReviewsText").innerHTML += '<li>' + xitem + '</li>';
				})
				document.getElementById("restaurantDeets").open =true;				
			}))
		
	}

  render() {
    return (
	<React.Fragment>
	<h1> All Restaurants!</h1>
      <div className="App">
		
      </div>
	  <div>
		<form>
			<select id="restaurants-name" onChange={this.pickedRestaurant}>
			<option value=""  selected>Select your option</option>
			</select>
		</form>
		<details id="restaurantDeets" style={{width:'50%'}}>
			<summary id="restaurantName" style={{width:'50%'}} hidden='true'></summary>
			<p id="restaurantMood" style={{width:'50%'}}></p>
			<p id="restaurantRating" style={{width:'50%'}}></p>
			<p id="restaurantReviews" style={{width:'50%'}}></p>
				<ol id="restaurantReviewsText"style={{width:'50%'}}></ol>
			<address id="restaurantAddress" style={{width:'50%'}}></address>
			
			
		</details>
	  </div>
	</React.Fragment>
    );
  }
}

export default Main;
