import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import './team08.css';

class App extends Component {
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
      if (isAuthenticated){
        this.userHasAuthenticated();
      }
    }

    handleLogoff = async e => {
      e.preventDefault();
      this.setState({isAuthenticated:false,
        name: '',
        email: ''});
        sessionStorage.setItem("isAuthenticated", false);
        sessionStorage.setItem("UserName", '');
        sessionStorage.setItem("Email", '');
      };

      render() {
        const childProps = {
          isAuthenticated: this.state.isAuthenticated,
          userHasAuthenticated: this.userHasAuthenticated
        };

        return (
          <div className="App">
          Welcome {this.state.name}! {this.state.email} <a href="Main" onClick={this.handleLogoff}> Logoff! </a>
          <BrowserRouter>
          <Router childProps={childProps}/>
          </BrowserRouter>
          </div>
        );
      }
    }



    export default App;
