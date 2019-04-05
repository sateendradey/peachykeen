import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import avatar from './img/user-profile.jpg'
import './styles/mainstyle.css';

class Profile extends Component {
  state = {
    isAuthenticated: false,
    name: '',
    email: '',
    message: '',
    score: 0,
    since: '',
    isError: false,
    color: 'danger'
  }

  onDismissError() {
    this.setState({ isError: false });
  }

  constructor(props) {
    super(props);
    this.onDismissError = this.onDismissError.bind(this);
    this.handleLoadProfile = this.handleLoadProfile.bind(this);
    this.state = {
      isAuthenticated: false,
      isError: false,
      color: 'danger'
    };
  }

  userHasAuthenticated = async authenticated => {
    await this.setState({ isAuthenticated: authenticated,
      name: sessionStorage.getItem("UserName"),
      email: sessionStorage.getItem("Email")});
    this.handleLoadProfile();
    }

    componentDidMount(){
      var isAuthenticated = sessionStorage.getItem("isAuthenticated");
      this.userHasAuthenticated(isAuthenticated);
  }

  handleLoadProfile = async e => {
    const request = '/profiles/' + this.state.email;
    const response = await fetch(request);
    if (response.status === 404){
      await this.setState({ message: "Unexpected error occurred",
                            isError: true,
                            color: 'danger'});
    }
    else{
      const body = await response.json();
      var sinceDate = new Date(body.date).toDateString();
      await this.setState({ score: 0,
                            since: sinceDate,});
  }
}

  render() {
    return (
      <div className="App">
      <section className="profile">
      <div className="profile-details">
      <Alert color={this.state.color} isOpen={this.state.isError} toggle={this.onDismissError}>
      {this.state.message}
      </Alert>
      <div className="row justify-content-center">
      <h3 className="form-title">Peachy Profile</h3>
      </div>
      <div className="row justify-content-center">
      <img className="profile-picture" src={avatar} alt="user avatar"/>
      </div>
      <div className="row justify-content-center">
      <div className="descript">
      <h4> {this.state.name} </h4>
      <p>{this.state.email}</p>
      <div className="peach-score"><i className="em em-peach" title="Peachy Score"></i>{this.state.score}</div>
      <p>Started Peaching on {this.state.since}</p>
      </div>
      </div>
      </div>
      <div className="profile-details">
      <div className="profile-reviews">
      <div className="row">
      Restaurant Name:
      </div>
      <div className="row">
      Review Date:
      </div>
      <div className="row">
      Review:
      </div>
      </div>
      </div>
      </section>
      </div>
    );
  }
}

export default Profile;
