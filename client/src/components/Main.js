import React, { Component } from 'react';
import moment from 'moment';
import LoaderButton from "./LoaderButton";
import logo from './img/Peach-Logo.png';

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
			Days: days
		});
	};

	render() {
		//populates the select
		var options = this.state.restaurantNames?
		this.state.restaurantNames.map(function(name, index){
			return <option key={index} value={name}>{name}</option>
		})
		: '';
		const cards = this.state.data ? this.state.data.map(function(card){
			console.log(card);
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
				<div className="col-lg-4 col-md-6 col-sm-12">
				<div className="card">
				<div className="card-content">
				<div className="card-body" style={{color: 'black'}}>
				<a href={restLink}> <span class="customH4 card-title">{card.Name}</span> </a>
				<h6 class="card-subtitle text-muted"><i className= "em em-peach" title ='Peachy Rating'></i>{card.Rating}</h6>
				</div>
				{
					card.Images && card.Images.length > 0 ?
				 	<a href={restLink}><img class="img-fluid" src={"data:image/jpeg;base64,"+card.Images[0].image} alt={card.Name}/></a>
					: null
			  }
				<div className = 'card-body'>
				<p class="card-text">
				<i class="fas fa-grin-hearts" title="Mood"></i>  {card.Mood}
				<i class="fas fa-utensils" title="Restaurant Type"></i>    {card.Type}
				</p>
				<div>
				<span className='caption' style={{width:'100%'}}>{DaysOfWeek}</span>
				</div>
				<span className="card-text"> {openAt} to {closeAt} </span>
				<div className = "rightSide">
				<a href={restLink} className="btnHeart"><i class="fas fa-heart" tite="favorite"></i></a>
				</div>
				</div>
				</div>
				</div>
				</div>
			)
		}):null;

			var LoadButton = <LoaderButton
			block = "true"
			bssize="large"
			type="submit"
			isLoading={this.state.isLoading}
			text="Login"
			loadingText="Data Loading"
			id = "DataLoad"
			/>
			return (
				<React.Fragment>
				<div className = "App">
				<div className="restaurant-content">
				<div className="restaurant-header">
				<div id = "image_div">
				<img src={logo} alt="Peaches Logo" />
				</div>
				<h1> Welcome to Peachy Keen!</h1>
				</div>
				<div className="row match-height">
				{this.state.isLoading ? LoadButton : cards}
				</div>
				</div>
				</div>
				</React.Fragment>
			);
		}
	}

	export default Main;
