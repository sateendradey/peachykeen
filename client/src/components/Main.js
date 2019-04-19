import React, { Component } from 'react';

class Main extends Component {

	state = {
		restaurants: [],
		selectedRestaurant: '',
		isLoading: false,
		data: [],
	};

	constructor(props){
		super(props);
		this.getDataFromDb = this.getDataFromDb.bind(this);
	}
	//function to contain the fetch
	componentDidMount() {
		//sets isLoading to true if we want to display some graphics during loading
		this.setState({ isLoading: true});
		//fetch pulls all restaurant data into an array
		this.getDataFromDb();
		// fetch('/restaurants')
		// .then(res =>res.json())
		// .then(resArray=>resArray.forEach(function(item,listHTML=[],listItemNames=[]) {
		// 	//concatenates the values together for each value in our db
		// 	listItemNames = item.Name.toString();
		// 	//adds each array item to a dropdown list
		// 	document.getElementById("restaurants-name").innerHTML += '<option value="'+ listItemNames + '">'+ listItemNames + '</select>'
		// }))
		// this.setState({ isLoading: false});
	}

	getDataFromDb = async () => {
    const response = await fetch('/restaurants');
		const body = await response.json();
		var array = Array.from(body);
		var names = array.map(names => names.Name);
		console.log(names);
	};

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
	<div class = "App">
	 <div class= "container">
	<div class="restaurant-content">
		<form style = {{width:'100%', textAlign: 'center'}}>
		<h1 class="restaurant-header"> All Restaurants!</h1>
			<select id="restaurants-name" onChange={this.pickedRestaurant} style = {{width:'100%', textAlign: 'center'}}>
			<option value="" selected>Select A Restaurant</option>
			</select>

		<details id="restaurantDeets">
			<summary id="restaurantName" hidden='true'></summary>
			<p id="restaurantMood"></p>
			<p id="restaurantRating"></p>
			<p id="restaurantReviews"></p>
				<ul id="restaurantReviewsText" style= {{listStyleType:'none'}} ></ul>
			<address id="restaurantAddress"></address>


		</details>
		</form>

	</div>
	</div>
	</div>
	</React.Fragment>
    );
  }
}

export default Main;
