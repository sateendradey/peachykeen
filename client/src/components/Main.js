import React, { Component } from 'react';
import moment from 'moment';
class Main extends Component {

	constructor(props) {
		super(props);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.getDataFromDb = this.getDataFromDb.bind(this);
		this.render = this.render.bind(this);
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
			restaurantId:'',
			Days: []
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
		var days = Array.from(body).map(days=>days.Days)
		var hrs = Array.from(body).map(hrs=>hrs.Hours)
		this.setState({
			restaurantNames: names,
			  isLoading: false,
				Days: days});

	};

	render() {
		//populates the select
		var options = this.state.restaurantNames?
		this.state.restaurantNames.map(function(name){
			return <option value={name}>{name}</option>
		})
		: '';

		//populates the select


		//populates the reviews

		//variables to hold the state to display

		var selectedName = this.state.selectedRestaurant;
		var selectedMood = this.state.restaurantMood;
		var selectedRating = this.state.restaurantRating;
		var selectedCity = this.state.restaurantCity;
		var selectedState = this.state.restaurantState;
		var detailsHidden = this.state.detailsHidden;
		var detailsOpen = this.state.detailsOpen;
		var selectedId = this.state.restaurantId;
		var lcldata = this.state.data;


		const cards = this.state.data.map(function(card){
			var DaysOfWeek = card.Days.map(function(day){
						switch(day) {
							case "M":
							return <span className="numberCircle"> M </span>
							case "T":
							return <span className="numberCircle"> T </span>
							case "W":
							return <span className="numberCircle"> W </span>
							case "R":
							return <span className="numberCircle"> Th </span>
							case "F":
							return <span className="numberCircle"> F </span>
							case "Sa":
							return <span className="numberCircle"> Sa </span>
							case "S":
							return <span className="numberCircle"> S </span>
							default:
							return "";
						}
					});
			var restLink = '/restaurant/'+card.id;
			var openAt = moment(card.Hours[0], 'HH:mm').format('h:mm A');
			var closeAt = moment(card.Hours[1], 'HH:mm').format('h:mm A');
			return (
			<div class="card">
			<div class="card-header" style={{color: 'black'}}>
    	{card.Name}
  		</div>
	 <div class = 'card-body' style={{maxwidth: '25rem', color: 'black'}}>
	 <h5>{card.Type}</h5>
	 <h5>{card.Mood}</h5>
	 	<i class= "em em-peach" title ='Peachy Rating'></i>{card.Rating}
		<div>
		<a href={restLink} class="btn btn-primary">Favorite!</a>
	 </div>
	 {card.Bar}
	 <div><span className='caption' style={{width:'100%'}}>{DaysOfWeek}</span></div>
	 <span> {openAt} to {closeAt} </span>
	 </div>
	 </div>)
 });

		return (
			<React.Fragment>
			<div class = "App">
			<div class= "container">
			<div class="restaurant-content">
			<form style = {{width:'100%', textAlign: 'center'}}>
			<h1 class="restaurant-header"> All Restaurants!</h1>
			<div class="card-columns">
			{cards}
			</div>
			</form>

			</div>
			</div>
			</div>
			</React.Fragment>
		);
	}
}

export default Main;
