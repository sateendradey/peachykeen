import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import './styles/mainstyle.css';
import LoaderButton from "./LoaderButton";
import Modal from 'react-modal';
import DatePicker from 'react-datepicker'
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";

import moment from 'moment';
import logo from './img/Peach-Logo.png';

const SUCCESSMESSAGE = "Success";


Modal.setAppElement('#root')
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
    user_name:"",
    modalIsOpen: false,
    reserveDate: setHours(new Date(),24),
    daysNumber: [],
    openFrom: '',
    openTill: '',
    disabledTimes: [],
    colorModal: "danger",
    isErrorModal: false,
    messageModal: '',
    isSuccessReserve: false,
    messageReserve: "",
    colorReserve: "success",
    images: []
  }

  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getDataFromDb = this.getDataFromDb.bind(this);
    this.onDismissSuccess = this.onDismissSuccess.bind(this);
    this.onDismissErrorModal = this.onDismissErrorModal.bind(this);
    this.onDismissSuccessReserve = this.onDismissSuccessReserve.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChangeReserve = this.handleChangeReserve.bind(this);
    this.setDisabledTimes = this.setDisabledTimes.bind(this);
  }

  handleChangeReserve(date) {
    this.setState({
      reserveDate: date
    });
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated,
      user_name: sessionStorage.getItem("UserName"),
      user_id: sessionStorage.getItem("Email")
    });
  }

  isOpen = (date) => {
    const day = new Date(date).getDay()
    var ret = this.state.daysNumber.indexOf(day) === -1 ? false:true;
    return ret;
  }

  setDisabledTimes(){
    const openTime = this.openTime(this.state.openFrom);
    openTime.setMinutes(-3);
    const closeTime = this.openTime(this.state.openTill);
    var disableTime = [];
    //like 11am - 3 am, then disable all times between 3am and 11am
    if (closeTime < openTime){
      var loop = setMinutes(closeTime, closeTime.getMinutes() + 30);
      while (loop < openTime){
        disableTime.push(loop);
        loop = setMinutes(loop, loop.getMinutes() + 30);
      }
    }
    else{
      loop = new Date();
      loop.setHours(0,0,0,0);
      while (loop < openTime){

        disableTime.push(loop);
        loop = setMinutes(loop, loop.getMinutes() + 30);
      }
      const midnight = new Date();
      midnight.setHours(23,59,0,0);
      loop = setMinutes(closeTime, closeTime.getMinutes() + 30);
      while (loop < midnight){
        disableTime.push(loop);
        loop = setMinutes(loop, loop.getMinutes() + 30);
      }
    }
    this.setState({ disabledTimes: disableTime});
  }
  openTime(time, date = new Date()){
    var Time = time.split(':');
    var hours = Time[0];
    var mins = Time[1];
    return setHours(setMinutes(date, mins), hours);
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
    const response = await fetch(requestUrl);
    const body = await response.json();
    this.setState({ Name: body.Name,
      id: body.id,
      Reviews: Array.from(body.Reviews),
      Rating:body.Rating,
      Type: body.Type,
      Mood:body.Mood,
      Bar: body.Bar,
      Hours: Array.from(body.Hours),
      Days: Array.from(body.Days),
      Catering:body.Catering ? <i className="fas fa-check-square"></i>:<i className="fas fa-times-circle"></i>,
      TakeOut: body.TakeOut ? <i className="fas fa-check-square"></i>:<i className="fas fa-times-circle"></i>,
      Address1: body.Street,
      Address2: body.City +", "+ body.State+" "+body.Zip,
      openFrom: body.Hours[0],
      openTill: body.Hours[1],
      images: body.Images ? Array.from(body.Images):null
    });
    var arrDays =[];
    this.state.Days.map((day) => {
      switch(day) {
        case "M":
        arrDays.push(1);
        break;
        case "T":
        arrDays.push(2);
        break;
        case "W":
        arrDays.push(3);
        break;
        case "R":
        arrDays.push(4);
        break;
        case "F":
        arrDays.push(5);
        break;
        case "Sa":
        arrDays.push(6);
        break;
        case "S":
        arrDays.push(0);
        break;
        default:
        break;
      }
      return 0;
    });
    this.setState({ daysNumber: arrDays });
    this.setDisabledTimes();
    this.setState({ isLoading: false });
  };

  onDismissSuccess() {
    this.setState({ isSuccess: false });
  }

  onDismissSuccessReserve() {
    this.setState({ isSuccessReserve: false });
  }

  onDismissErrorModal() {
    this.setState({ isErrorModal: false });
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
      }
    }
    this.setState({
      isSaving: false
    });
  }

  confirmReservation = async (e) => {
    e.preventDefault();
    this.setState({isSaving: true});
    console.log(this.state.reserveDate);
    var a = this.state.reserveDate.getTime() > this.openTime(this.state.openTill,this.state.reserveDate).getTime();
    console.log(a);
    a = this.state.reserveDate.getTime() < this.openTime(this.state.openFrom,this.state.reserveDate).getTime();
    console.log(a);
    var today = new Date();
    if (this.state.reserveDate === null){
      this.setState({ isErrorModal: true,
        messageModal: "Please enter a date",
        colorModal: "danger"
      });
    }
    else if (this.state.reserveDate.getDate() <= today.getDate()){
      this.setState({ isErrorModal: true,
        messageModal: "Reservations can only be made for future dates",
        colorModal: "danger"
      });
    }
    else if (!this.isOpen(this.state.reserveDate)){
      this.setState({ isErrorModal: true,
        messageModal: "Restaurant is not open on this day",
        colorModal: "danger"
      });
    }
    else if ((this.state.reserveDate.getTime() < this.openTime(this.state.openFrom,this.state.reserveDate).getTime()) ||
    (this.state.reserveDate.getTime() > this.openTime(this.state.openTill,this.state.reserveDate).getTime())){
      this.setState({ isErrorModal: true,
        messageModal: "Restaurant is not open at this time",
        colorModal: "danger"
      });
    }
    else{
      if (window.confirm('Are you sure you wish to confirm this Reservation?')){
        const response = await fetch('/restaurant/reserve/'+this.state.id, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: this.state.user_id, // name
            user_name:this.state.user_name, // password
            rest_name:this.state.Name, //restaurant Name
            date: this.state.reserveDate
          }),
        });
        const body = await response.text();
        if (body === SUCCESSMESSAGE){
          this.setState({ isSuccessReserve: true,
            messageReserve: "Your reservation is confirmed",
            colorReserve: "success",
            reserveDate: setHours(new Date(),24)
          });
          this.closeModal();
        }
        else{
          this.setState({ isErrorModal: true,
            messageModal: "Issue updating review. Please try again",
            colorModal: "danger"
          });
        }
      }
    }
    this.setState({
      isSaving: false
    });
  }

  render() {
    var link = "/Login?redirect=/restaurant/"+this.state.id;
    var Carousel = <div id="carouselRestaurant" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
    {
      this.state.images ? this.state.images.map(function(image, index){
        return <li data-target="#carouselRestaurant" data-slide-to={index} key={index} className={index === 0 ? "active":null}></li>
      }):null
    }
    </ol>
    <div className="carousel-inner">
    {
      this.state.images ? this.state.images.map(function(image, index){
        return <div className={index === 0 ? "carousel-item active":"carousel-item"}>
              <img className="rounded" src={"data:image/jpeg;base64,"+image.image} alt="Slide"/>
        </div>
      }):null
    }
    </div>
    <a className="carousel-control-prev" href="#carouselRestaurant" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselRestaurant" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
    </a>
    </div>
    //Create graphic for each day of the week restaurant is open
    var DaysOfWeek = this.state.Days.map(function(day){
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
    //Make reservation section
    var ReserveModal = <React.Fragment>
    <button type="button" className="btn btn-primary" id="reserveButton"  onClick={this.openModal}>Make a reservation</button>
    <Modal
    isOpen={this.state.modalIsOpen}
    onAfterOpen={this.afterOpenModal}
    onRequestClose={this.closeModal}
    style={modalStyles}
    contentLabel="Make a reservation"
    id = "TermsModal"
    >
    <h3>Reserve a table at {this.state.Name}</h3>
    <Alert color={this.state.colorModal} isOpen={this.state.isErrorModal} toggle={this.onDismissErrorModal}>
    {this.state.messageModal}
    </Alert>
    <div id="box">
    <div id="model-left-reserve">
    <form onSubmit={this.confirmReservation}>
    Choose your reservation date & time
    <br/>
    <span id="warningmessage"> *Dates and times that are not selectable are outside the hours of operation of this restaurant </span>
    <br/>
    <DatePicker id="resDatePicker"
    selected={this.state.reserveDate}
    onChange={this.handleChangeReserve}
    minDate={setHours(new Date(),24)}
    excludeTimes={this.state.disabledTimes}
    filterDate={ this.isOpen }
    showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={30}
    dateFormat="EEEE, MMMM d, yyyy h:mm aa"
    timeCaption="Time"
    />
    <br/>
    <br/>
    <button className="btn btn-success" type="submit"> Confirm Reservation </button>
    <br/>
    <br/>
    </form>
    <button className="btn btn-danger" type="button" onClick={this.closeModal}> Cancel </button>
    </div>
    <div id="model-right-reserve">
    <img src={logo} id="peaches_logo" alt="Peaches Logo" />
    </div>
    </div>
    </Modal>
    </React.Fragment>;
    var ReserveRest = this.state.isAuthenticated ? ReserveModal: <div>Please <a href={link}> Login </a> to make a reservation</div>;
    //Populate reviews
    var RestReviews = this.state.Reviews ?
    this.state.Reviews.length !== 0 ?
    this.state.Reviews.map(function(review){
      return <div className="profile-review rounded">
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
    }): "This restaurant has no reviews yet"
    : "This restaurant has no reviews yet";

    //populate new review section
    var LoginScreen = (
      <form onSubmit={this.handleNewReview} >
      <textarea className="form-control" name = "Review" rows="5" placeholder="Write your review" value={this.state.newReview}
      onChange={e => this.setState({ newReview: e.target.value })}/>
      <div align="right">
      <LoaderButton
      id = "saveReview"
      bssize="small"
      type="submit"
      isLoading={this.state.isSaving}
      text="Save Review"
      loadingText=" Saving.."
      />
      </div>
      </form>
    );

    var WriteReview = this.state.isAuthenticated ? LoginScreen : <div>Please <a href={link}> Login </a> to write a review</div>;

    return (
      <div className="App">
      <section className="profile">
      <div className="profile-details">
      <div className="row justify-content-center">
      <h1 className="form-title">{this.state.Name}</h1>
      </div>
      <Alert color={this.state.colorReserve} isOpen={this.state.isSuccessReserve} toggle={this.onDismissReserve}>
      {this.state.messageReserve}
      </Alert>
      <div className="row justify-content-center">
      </div>
      <div className="row justify-content-center">
      {this.state.images ? Carousel : null}
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
      <p><span className="caption">Hours of Operation</span>{moment(this.state.openFrom, 'HH:mm').format('h:mm A')} to {moment(this.state.openTill, 'HH:mm').format('h:mm A')}</p>
      <p><span className="caption">Days Open</span>{DaysOfWeek}</p>
      <p><span className="caption">Catering</span>{this.state.Catering}</p>
      <p><span className="caption">TakeOut</span>{this.state.TakeOut}</p>
      </div>
      <p><span className="caption">Address</span><br />
      {this.state.Address1}<br/>
      {this.state.Address2}</p>
      {ReserveRest}
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
      </section>
      </div>
    );

  }
}
export default Restaurant;

const modalStyles = {
  content : {
    height                : '60%',
    width                 : 'auto',
    top                   : '30%',
    left                  : '20%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-5vh, -5vh)'
  }
};
