import React, { Component } from 'react';
import avatar from './img/user-profile.jpg'
import './styles/mainstyle.css';

class Profile extends Component {
  state = {
    isAuthenticated: false,
    name: '',
    email: ''
  }

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated,
      name: sessionStorage.getItem("UserName"),
      email: sessionStorage.getItem("Email")});
    }

    componentDidMount(){
      var isAuthenticated = sessionStorage.getItem("isAuthenticated");
      this.userHasAuthenticated(isAuthenticated);
  }
  render() {
    return (
      <div className="App">
      <section className="profile">
      <div className="profile-details">
      <div className="row justify-content-center">
      <h3 className="form-title">Peachy Profile</h3>
      </div>
      <div className="row justify-content-center">
      <img className="profile-picture" src={avatar} alt="user avatar"/>
      </div>
      <div className="row justify-content-center profile-content">
      Name: {this.state.name}
      </div>
      <div className="row justify-content-center profile-content">
      Email: {this.state.email}
      </div>
      <div className="row justify-content-center profile-content">
      Peachy Score:
      </div>
      <div className="row justify-content-center profile-content">
      Member Since:
      </div>
      <br/>
      </div>
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
      </section>
      </div>
    );
  }
}

export default Profile;
