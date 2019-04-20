import React, { Component } from 'react';

class Main extends Component {

	state = {
		restaurants: [],
		selectedRestaurant: '',
		isLoading: false,
		data: [],
	};

	constructor(props) {
		super(props);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.getDataFromDb = this.getDataFromDb.bind(this);
		this.pickedRestaurant = this.pickedRestaurant.bind(this);
		this.state = {
			restaurants: [],
			selectedRestaurant: '',
			isLoading: false,
			data: [],
			restaurantNames: [],
			detailsOpen: false,
			restaurantReviews:[],
			restaurantRating:'',
			restaurantMood:'',
			restaurantCity: '',
			restaurantState:'',
			detailsHidden:true,
			restaurantId:''
		};
	}

	//function to contain the fetch
	componentDidMount() {
		//sets isLoading to true if we want to display some graphics during loading
		this.setState({ isLoading: true});
		//fetch pulls all restaurant data into an array
		this.getDataFromDb();
	}

	getDataFromDb = async () => {
		const response = await fetch('/restaurants');
		const body = await response.json();
		this.setState({data: body});
		var names = Array.from(body).map(names => names.Name);
		this.setState({restaurantNames: names,
									  isLoading: false});
	};

	pickedRestaurant(selectedRestaurant) {
		this.setState({ isLoading: true});
		//selected Name
		this.setState({detailsOpen: false});
		const lclrest = selectedRestaurant.target.value;
		this.setState({selectedRestaurant: lclrest});
		//Selected Mood
		const lclDataArray = this.state.data.filter(mood=>mood.Name === lclrest);
		var lclMood = lclDataArray[0].Mood;
		this.setState({restaurantMood:lclMood});
		//Selected Rating
		var lclRating = lclDataArray[0].Rating;
		this.setState({restaurantRating: lclRating});
		//Selected Reviews
		var lclReviews = lclDataArray[0].Reviews;
		this.setState({restaurantReviews: lclReviews});
		//Selected City
		var lclCity = lclDataArray[0].City;
		this.setState({restaurantCity: lclCity});
		//Selected state
		var lclState = lclDataArray[0].State;
		this.setState({restaurantState: lclState});
		//ID
		var lclId = lclDataArray[0]._id;
		this.setState({restaurantId: lclId});
		this.setState({detailsOpen: true});
		this.setState({detailsHidden: false});
		this.setState({ isLoading: false});
	}

	render() {
		//populates the select
		var options = this.state.restaurantNames?
		this.state.restaurantNames.map(function(name){
			return <option value={name}>{name}</option>
		})
		: '';
		//populates the reviews
		var reviews = this.state.restaurantReviews?
		this.state.restaurantReviews.map(function(review){
			return <li value={review}>{review}</li>
		})
		:'';
		//variables to hold the state to display
		var selectedName = this.state.selectedRestaurant;
		var selectedMood = this.state.restaurantMood;
		var selectedRating = this.state.restaurantRating;
		var selectedCity = this.state.restaurantCity;
		var selectedState = this.state.restaurantState;
		var detailsHidden = this.state.detailsHidden;
		var detailsOpen = this.state.detailsOpen;
		var selectedId = this.state.restaurantId;


		return (
			<React.Fragment>
			<div class = "App">
			<div class= "container">
			<div class="restaurant-content">
			<form style = {{width:'100%', textAlign: 'center'}}>
			<h1 class="restaurant-header"> All Restaurants!</h1>
			<select className="form-control" id="restaurants-name" onChange={this.pickedRestaurant} style = {{width:'100%', textAlign: 'center'}}>
			<option value="" selected>Select A Restaurant</option>{options}
			</select>

			<details id="restaurantDeets" open={detailsOpen} value = {selectedName} hidden={detailsHidden}>
			{selectedName}
			<p id="restaurantMood">{selectedMood}</p>
			<p id="restaurantRating" >{selectedRating} Outta 5</p>
			<p id="restaurantReviews"><strong>Reviews</strong></p>
			<p id="restaurantId">ID: {selectedId}</p>
			<ul id="restaurantReviewsText" style= {{listStyleType:'none'}} >{reviews}</ul>
			<address id="restaurantAddress">{selectedCity}, {selectedState}</address>
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
