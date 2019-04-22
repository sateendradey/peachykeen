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
		this.handleChange = this.handleChange.bind(this);
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
			Days: [],
			Moods:[],
			selectedMood: "-1",
			masterData: []
		};
	}

	//function to contain the fetch
	componentDidMount() {
		//sets isLoading to true if we want to display some graphics during loading
		this.setState({ isLoading: true });
		//fetch pulls all restaurant data into an array
		this.getDataFromDb();
	}

	getDataFromDb = async () => {
		const response = await fetch('/restaurants');
		const body = await response.json();
		this.setState({data: body,
										masterData: body});
		var names = Array.from(body).map(names => names.Name);
		var days = Array.from(body).map(days=>days.Days);
		var mood = Array.from(body).map(mood=>mood.Mood);
		mood = Array.from(new Set(mood));
		this.setState({
			restaurantNames: names,
			isLoading: false,
			Days: days,
			Moods: mood
		});
	};

	handleChange = async (e) =>{
		e.preventDefault();
    await this.setState({selectedMood: e.target.value});
		if (this.state.selectedMood === "-1"){
			this.setState({data: this.state.masterData})
		}
		else{
			var data = this.state.masterData;
			var newData = [];
			data.map(restaurant => {
				if (restaurant.Mood === this.state.selectedMood)
					newData.push(restaurant);
			});
			this.setState({data: newData});			
		}
  }

	render() {
		const cards = this.state.data ? this.state.data.map(function(card){
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
				<a href={restLink}> <span className="customH4 card-title">{card.Name}</span> </a>
				<h6 classNAme="card-subtitle text-muted"><i className= "em em-peach" title ='Peachy Rating'></i>{card.Rating}</h6>
				</div>
				{
					card.Images && card.Images.length > 0 ?
				 	<a href={restLink}><img className="img-fluid" src={"data:image/jpeg;base64,"+card.Images[0].image} alt={card.Name}/></a>
					: null
			  }
				<div className = 'card-body'>
				<p className="card-text">
				<i className="fas fa-grin-hearts" title="Mood"></i>  {card.Mood}
				<i className="fas fa-utensils" title="Restaurant Type"></i>    {card.Type}
				</p>
				<div>
				<span className='caption' style={{width:'100%'}}>{DaysOfWeek}</span>
				</div>
				<span className="card-text"> {openAt} to {closeAt} </span>
				<div className = "rightSide">
				<a href={restLink} className="btnHeart"><i className="fas fa-heart" tite="favorite"></i></a>
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

			var MoodOptions = <div className="col-3" id="mooddrop">
			<select className = "form-control" value={this.state.selectedMood} onChange={this.handleChange}>
			<option value="-1">Anything!</option>
			{
				this.state.Moods.map(mood => {
					return <option key={mood} value={mood}>{mood}</option>
				})
			}
			</select>
			</div>
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
				<div className="restaurant-header">
				<p> What are you in the mood for? </p>
				{MoodOptions}
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
