import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import signup_img from './img/signup-image.jpg';
import LoaderButton from "./LoaderButton";

const SUCCESSMESSAGE = "Success";

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    reppassword:'',
    isValid: false,
    isSuccess: false,
    isLoading: false
  };

  constructor(props) {
    super(props);
    this.repPass = React.createRef();
    this.clearState = this.clearState.bind(this);
    this.onDismissSuccess = this.onDismissSuccess.bind(this);
    this.onDismissValid = this.onDismissValid.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  onDismissSuccess() {
    this.setState({ isSuccess: false });
  }

  onDismissValid() {
    this.setState({ isValid: false });
  }

  validatePassword(e){
    this.setState({ reppassword: e.target.value },() => {
      const { password, reppassword } = this.state;
      if (password !== reppassword) {
        this.repPass.current.setCustomValidity("Passwords don't match!!");
      }
      else {
        this.repPass.current.setCustomValidity("");
      }
    });
  }

  clearState(){
    this.setState({
      name: '',
      email: '',
      password: '',
      reppassword:'',
      isValid: false });
    }

    routeChange() {
      let path = `Login`;
      this.props.history.push(path);
    }

    handleSubmit = async e => {
      e.preventDefault();
      this.setState({isLoading: true});
      var today = new Date();
      const response = await fetch('/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name, // name
          password:this.state.password, // password
          email: this.state.email,
          date: today,
          reserve: [],
          reviews: []}),
        });
        const body = await response.text();
        if (body === SUCCESSMESSAGE){
          this.clearState();
          this.setState({ isSuccess: true });
        }
        this.setState({isLoading: false});
      };
      render() {
        return (
          <div className="App">
          <section className="sign-in">
          <div className="container">
          <Alert color="success" isOpen={this.state.isSuccess} toggle={this.onDismissSuccess}>
          User created successfully! <a href ="Login"> Login here </a>
          </Alert>
          <div className="signup-content">
          <div className="signup-form">
          <h3 className="form-title">Sign up</h3>
          <form onSubmit={this.handleSubmit} className="register-form" id="register-form">
          <div className="form-group">
          <label for="name"><i className="fas fa-user-alt"></i></label>
          <input name="name" id="name" type="text" placeholder="Name" value={this.state.name} autoComplete="name"
          onChange={e => this.setState({ name: e.target.value })} required/>
          </div>
          <div className="form-group">
          <label for="email"><i className="fas fa-envelope"></i></label>
          <input name="email" id="email_add" type="email" placeholder="Email" value={this.state.email} autoComplete="email"
          onChange={e => this.setState({ email: e.target.value })} required/>
          </div>
          <div className="form-group">
          <label for="pass"><i className="fas fa-lock"></i></label>
          <input name="pass" id="pass" type="password" placeholder="Password" value={this.state.password} autoComplete="new-password"
          onChange={e => this.setState({ password: e.target.value })} suggested="new-password" required/>
          </div>
          <div className="form-group">
          <label for="re-pass"><i className="fas fa-key"></i></label>
          <input name="re_pass" id="re_pass" type="password" placeholder="Repeat password" value={this.state.reppassword} ref={this.repPass}
          onChange={this.validatePassword} required/>
          </div>
          <div className="form-group">
          <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
          </div>
          <div className="form-group form-button">
          <LoaderButton
          block
          bsSize="large"
          type="submit"
          isLoading={this.state.isLoading}
          text="Sign up"
          loadingText=" Registering"
          />
          </div>
          </form>
          </div>
          <div className="signup-image">
          <figure><img src={signup_img} alt="sign up"/></figure>
          <a href="/Login" className="signup-image-link">I am a already a member</a>
          </div>
          </div>
          </div>
          </section>
          </div>
        );
      }
    }

    export default Signup;
