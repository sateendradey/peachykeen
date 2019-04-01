import React, { Component } from 'react';

class Landing extends Component {
  state = {
    isAuthenticated: false,
    name: '',
    email: ''
  }

  componentDidMount(){
    var isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (isAuthenticated){
      this.setState({isAuthenticated: true,
                     name: sessionStorage.getItem("UserName"),
                     email: sessionStorage.getItem("Email")});
    }
  }

  handleLogoff = async e => {
    e.preventDefault();
    this.setState({isAuthenticated:false,
                   name: '',
                   email: ''})
    sessionStorage.setItem("isAuthenticated", false);
    sessionStorage.setItem("UserName", '');   
    sessionStorage.setItem("Email", '');

    };
  render() {
    return (
      <div className="App">
        Welcome {this.state.name}! {this.state.email} <a href="Main" onClick={this.handleLogoff}> Logoff! </a>
      </div>
    );
  }
}

export default Landing;
