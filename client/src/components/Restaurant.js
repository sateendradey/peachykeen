import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import './styles/mainstyle.css';
import LoaderButton from "./LoaderButton";
const SUCCESSMESSAGE = "Success";

class Restaurant extends Component{
  state = {
    id: '',
    Name: '',
    Reviews:null,
    Rating:'',
    Type: '',
    Mood:'',
    Bar: '',
    Hours: '',
    Days: [],
    Catering:'',
    TakeOut: '',
    Address1: '',
    Address2:'',
    newReview: '',
    email: '',
    isAuthenticated: false,
    isLoading: false,
    isSaving: false,
    isSuccess: false,
    color: "danger",
    user_id:"",
    user_name:""
  }

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getDataFromDb = this.getDataFromDb.bind(this);
    this.onDismissSuccess = this.onDismissSuccess.bind(this);
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated,
      user_name: sessionStorage.getItem("UserName"),
      user_id: sessionStorage.getItem("Email")
    });
  }

  //function to contain the fetch
  componentDidMount() {
    //sets isLoading to true if we want to display some graphics during loading
    this.setState({ isLoading: true});
    //fetch pulls all restaurant data into an array
    this.getDataFromDb();

    var isAuthenticated = sessionStorage.getItem("isAuthenticated");
    this.userHasAuthenticated(isAuthenticated);
    this.setState({ isLoading: false});
  }


  getDataFromDb = async () => {
    this.setState({ isLoading: true});
    var requestUrl = "/restaurants/" + this.props.match.params.id;
    console.log(requestUrl);
    const response = await fetch(requestUrl);
    const body = await response.json();
    this.setState({ Name: body.Name,
      id: body.id,
      Reviews: Array.from(body.Reviews),
      Rating:body.Rating,
      Type: body.Type,
      Mood:body.Mood,
      Bar: body.Bar,
      Hours: body.Hours,
      Days: Array.from(body.Days),
      Catering:body.Catering ? <i class="fas fa-check-square"></i>:<i class="fas fa-times-circle"></i>,
      TakeOut: body.TakeOut ? <i class="fas fa-check-square"></i>:<i class="fas fa-times-circle"></i>,
      Address1: body.Street,
      Address2: body.City +", "+ body.State+" "+body.Zip
    });
    this.setState({ isLoading: false});
  };

  onDismissSuccess() {
    this.setState({ isSuccess: false });
  }

  handleNewReview = async (e) => {
    e.preventDefault();
    this.setState({isSaving: true});
    var today = new Date();
    if (this.state.newReview === ""){
      this.setState({ isSuccess: true,
        message: "Please enter a review",
        color: "warning"
      });
    }
    else{
      if (window.confirm('Are you sure you wish to post this review?')){
        const response = await fetch('/restaurant/review/'+this.state.id, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: this.state.user_id, // name
            user_name:this.state.user_name, // password
            rest_name:this.state.Name, //restaurant Name
            review: this.state.newReview,
            date: today
          }),
        });
        const body = await response.text();
        if (body === SUCCESSMESSAGE){
          this.setState({ isSuccess: true,
            message: "New review updated successfully",
            color: "success",
            newReview: ""
          });
          this.getDataFromDb();
        }
        else{
          this.setState({ isSuccess: true,
            message: "Issue updating review. Please try again",
            color: "danger"
          });
        }
        console.log(response);
      }
    }
    this.setState({
      isSaving: false
    });
  }

  render() {
    var RestReviews = this.state.Reviews ?
    this.state.Reviews.map(function(review){
      return <div className="profile-review">
      <div className="row">
      <span className="caption">Reviewer</span> {review.user_name}
      </div>
      <div className="row">
      <span className="caption">Review Date</span> {new Date(review.date).toDateString()}
      </div>
      <div className="row">
      <span className="caption">Review</span>
      </div>
      <div className="row">
      <span className="rewviewText">{review.review}</span>
      </div>
      </div>
    })
    : "This restaurant has no reviews yet";
    var link = "/Login?redirect=/restaurant/"+this.state.id;
    var LoginScreen = (
      <form onSubmit={this.handleNewReview} >
      <textarea className="form-control" name = "Review" rows="5" placeholder="Write your review" value={this.state.newReview}
      onChange={e => this.setState({ newReview: e.target.value })}/>
      <div align="right">
      <LoaderButton
      block
      bsSize="small"
      type="submit"
      isLoading={this.state.isSaving}
      text="Save Review"
      loadingText=" Saving.."
      />
      </div>
      </form>
    );

    var WriteReview = this.state.isAuthenticated ? LoginScreen : <div>Please <a href={link}> Login </a> to write a review</div>;

    var DaysOfWeek = this.state.Days.map(function(day){
      switch(day) {
        case "M":
        return <span className="numberCircle"> M </span>
        break;
        case "T":
        return <span className="numberCircle"> T </span>
        break;
        case "W":
        return <span className="numberCircle"> W </span>
        break;
        case "R":
        return <span className="numberCircle"> Th </span>
        break;
        case "F":
        return <span className="numberCircle"> F </span>
        break;
        case "Sa":
        return <span className="numberCircle"> Sa </span>
        break;
        case "S":
        return <span className="numberCircle"> S </span>
        break;
        default:
        return "";
        break;
      }
    });
    return (
      <div className="App">
      <section className="profile">
      <div className="profile-details">
      <div className="row justify-content-center">
      <h3 className="form-title">{this.state.Name}</h3>
      </div>
      <div className="row justify-content-center">

      </div>
      <div className="row justify-content-center">
      <div className="descript">
      <div className="peach-score">
      <i className="em em-peach" title="Peachy Rating"></i>{this.state.Rating}
      </div>
      <br/>
      <div id="RestDetails" align="left">
      <p><span className="caption">Food Type</span>{this.state.Type}</p>
      <p><span className="caption">Mood</span>{this.state.Mood}</p>
      <p><span className="caption">Bar</span>{this.state.Bar}</p>
      <p><span className="caption">Hours of Operation</span>{this.state.Hours}</p>
      <p><span className="caption">Days Open</span>{DaysOfWeek}</p>
      <p><span className="caption">Catering</span>{this.state.Catering}</p>
      <p><span className="caption">TakeOut</span>{this.state.TakeOut}</p>
      </div>
      <p><span className="caption">Address</span><br />
      {this.state.Address1}<br/>
      {this.state.Address2}</p>
      </div>
      </div>
      </div>
      <div className="profile-details">
      <div className="profile-reviews">
      <h5 className="form-title">Add a review</h5>
      <Alert color={this.state.color} isOpen={this.state.isSuccess} toggle={this.onDismissSuccess}>
      {this.state.message}
      </Alert>
      {WriteReview}
      </div>
      <div className="profile-reviews">
      <h5 className="form-title">Reviews</h5>
      {RestReviews}
      </div>
      </div>
      <div className="profile-details">

      </div>
      </section>
      </div>
    );

  }
}
export default Restaurant;
