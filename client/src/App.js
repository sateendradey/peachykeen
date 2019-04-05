import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import logo from './img/Peach-Logo.png'
import avatar from './img/user-profile.jpg'
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
      this.userHasAuthenticated(isAuthenticated);
    }

    handleLogoff = async e => {
      e.preventDefault();
      this.userHasAuthenticated(false);
      this.setState({isAuthenticated:false,
        name: '',
        email: ''});
      sessionStorage.clear();
      };

      render() {
        const childProps = {
          isAuthenticated: this.state.isAuthenticated,
          userHasAuthenticated: this.userHasAuthenticated
        };

        var profile = "/Profile/" + this.state.email;
        return (
          <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <a className="navbar-brand" href="/main">
          <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="Ms. Peaches"/>
          <span className="brand-text">Peachy Keen</span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
          <a className="nav-link men" href="/Main" aria-label="Home">
          Home
          </a>
          </li>
          <li className="nav-item">
          <a className="nav-link men" href="/About" aria-label="About us">
          About us
          </a>
          </li>
          <li className="nav-item">
          <a className="nav-link men" href={profile} aria-label="Profile">
          Profile
          </a>
          </li>
          </ul>
          {this.state.isAuthenticated
            ? <React.Fragment>
              <a className="nav-link men-right welcome-text" href={profile}><img className="avatar" src={avatar} alt="user avatar"/>{'\u00A0'}Welcome {this.state.name}!</a>
              <a className="nav-link men-right" href="#" onClick={this.handleLogoff}><i className="fas fa-user-plus"></i>{'\u00A0'}Logout</a>
              </React.Fragment>
            : <React.Fragment>
              <a className="nav-link men-right" href="/Login"><i className="fas fa-sign-in-alt"></i>{'\u00A0'}Login</a>
              <a className="nav-link men-right signup-text" href="/Signup"><i className="fas fa-user-plus"></i>{'\u00A0'}Sign up</a>
              </React.Fragment>
          }
          </div>
          </nav>
          <BrowserRouter>
          <Router childProps={childProps}/>
          </BrowserRouter>
          </div>
        );
      }
    }



    export default App;
