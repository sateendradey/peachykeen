import React, { Component } from 'react';
import LoaderButton from "./LoaderButton";
import { Link } from 'react-router-dom';
import moment from 'moment';

class Admin extends Component {
  state = {
    isLoggedOn: true,
    userid: '',
    password: '',
    isSuccess: false,
    isLoading: false,
    selectedRestaurant: "-1",
    data: '',
    restaurantData: '',
    select: 'Reserves'
  }

  constructor(props){
    super(props);
    this.getDataFromDb();
  }

  getDataFromDb = async () => {
    this.setState({ isLoading: true });
    var response = "";
    if (this.state.selectedRestaurant === null || this.state.selectedRestaurant === "-1"){
      response = await fetch('/restaurants');
      const body = await response.json();
      this.setState({data: Array.from(body)});
      this.setState({restaurantData: Array.from(body)});
    }
    else {
      response = await fetch('/restaurants/'+this.state.selectedRestaurant);
      const body = await response.json();
      var array = [];
      array.push(body);
      this.setState({restaurantData: array});
      console.log(array);
    }
    this.setState({ isLoading: false });
    console.log(this.state.restaurantData);
  };

  handleChange = async (e) =>{
    await this.setState({selectedRestaurant: e.target.value});
    this.getDataFromDb();
  }
  handleLogin = (e) =>{
    e.preventDefault();
    if (this.state.userid === "admin" && this.state.password === "password"){
      this.setState({ isLoggedOn:true,
        message: "Login successful! Redirecting now!",
        isSuccess: true,
        color: 'success'
      });
      this.getDataFromDb();
    }
    else{
      this.setState({
        message: "Incorrect user name or password",
        isSuccess: false,
        color: 'danger'
      });
    }
  }
  render() {
    var Login = <div id="admin-login">
    <div className="col-3 container align-self-center">
    <form onSubmit={this.handleLogin}>
    <div className="row justify-content-center">
    <h5>Admin Portal</h5>
    </div>
    <div className="row justify-content-center">
    <span id="warningmessage"> {this.state.message} </span>
    </div>
    <br/>
    <div className="row justify-content-center">
    <div className="form-group">
    <label for="id"><i className="fas fa-user-alt"></i></label>
    <input name = "id" type="text" placeholder="User ID" value={this.state.email} autoComplete="username"
    onChange={e => this.setState({ userid: e.target.value })} required/>
    </div>
    <br/>
    </div>
    <div className="row justify-content-center">
    <div className="form-group">
    <label for="password"><i className="fas fa-key"></i></label>
    <input name="password" type="password" placeholder="Password" value={this.state.password} autoComplete="current-password"
    onChange={e => this.setState({ password: e.target.value })} required/>
    </div>
    <br/>
    </div>
    <div className="row justify-content-center">
    <button type="submit" className="btn btn-primary">Login</button>
    </div>
    <br/>
    </form>
    </div>
    </div>

    var LoadButton = <LoaderButton
    block = "true"
    bssize="large"
    type="submit"
    isLoading={this.state.isLoading}
    text="Login"
    loadingText="Data Loading"
    id = "DataLoad"
    />
    var RestDropDown = <select className = "form-control" value={this.state.selectedRestaurant} onChange={this.handleChange}>
    <option value="-1">All Restaurants</option>
    {
      this.state.data ? this.state.data.map((restaurant) => {
        return <option key={restaurant.id} value={restaurant.id}>{restaurant.Name}</option>
      }): ""
    }
    </select>
    var ReservationTable = <table className="table table-striped table-dark" id="reserveTable">
    <thead className="thead-light">
    <tr>
    <th scope="col">Restaurant Name</th>
    <th scope="col">User Name</th>
    <th scope="col">Email</th>
    <th scope="col">Date</th>
    <th scope="col">Time</th>
    </tr>
    </thead>
    <tbody>
    {
      this.state.restaurantData ? this.state.restaurantData.map((restaurant, index) => {
        return restaurant.Reserve ? restaurant.Reserve.map((reserve, index2) => {
          return <tr key={index+index2}>
          <th scope="row">{restaurant.Name}</th>
          <td>{reserve.user_name}</td>
          <td>{reserve.user_id}</td>
          <td>{moment(reserve.date).format("MM/DD/YY")}</td>
          <td>{moment(reserve.date).format("h:mm a")}</td>
          </tr>
        }): null
      }):null
    }
    </tbody>
    </table>

    var ReviewsTable = <table className="table table-striped table-light" id="reserveTable">
    <thead className="thead-dark">
    <tr>
    <th scope="col">Restaurant Name</th>
    <th scope="col">User Name</th>
    <th scope="col">Date</th>
    <th scope="col">Review</th>
    </tr>
    </thead>
    <tbody>
    {
      this.state.restaurantData ? this.state.restaurantData.map((restaurant, index) => {
        return restaurant.Reviews ? restaurant.Reviews.map((review, index2) => {
          return <tr key={index+index2}>
          <th scope="row">{restaurant.Name}</th>
          <td>{review.user_name}</td>
          <td>{moment(review.date).format("MM/DD/YY")}</td>
          <td>{review.review}</td>
          </tr>
        }): null
      }):null
    }
    </tbody>
    </table>

    var Page = <React.Fragment>
    <div className="row col-6">
    {RestDropDown}
    </div>
    <div className="row">
    <div className="col-8 justify-content-start">
    <Link onClick={e => this.setState({ select: "Reserves" })}>
    <h4 className="form-title form-link">Reservation Table</h4>
    </Link>
    </div>
    <div className="col-4 justify-content-end">
    <Link onClick={e => this.setState({ select: "Reviews" })}>
    <h4 className="form-title form-link">Reviews Table</h4>
    </Link>
    </div>
    </div>
    <div className="row">
    { this.state.select === "Reserves" ? ReservationTable : ReviewsTable}
    </div>
    </React.Fragment>

    var AdminDetails = <section className="profile">
    <div className="admin">
    <div className="row">
    <h3 className="form-title">Admin Portal</h3>
    </div>
    {this.state.isLoading ? LoadButton : Page}
    </div>
    </section>

    return (
      <div className="App">
      { this.state.isLoggedOn ? AdminDetails : Login }
      </div>

    );
  }
}

export default Admin;
