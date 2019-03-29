import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const SUCCESSMESSAGE = "Success";

class Profile extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    reppassword:'',
    isValid: false,
    isSuccess: false
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
      const response = await fetch('/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name, // name
          password:this.state.password, // password
          email: this.state.email, }),
        });
        const body = await response.text();
        if (body === SUCCESSMESSAGE){
          this.clearState();
          this.setState({ isSuccess: true });
        }

      };
      render() {
        return (
          <div className="App">
          <section id= "signup">
          <h2>Signup</h2>
          <div class="form-group">
          <Alert color="success" isOpen={this.state.isSuccess} toggle={this.onDismissSuccess}>
          User created successfully! <a href ="Login"> Login here </a>
          </Alert>
          <form onSubmit={this.handleSubmit}>
          <div>
          <input class="form-control" type="text" placeholder="Name" value={this.state.name} autocomplete="name"
          onChange={e => this.setState({ name: e.target.value })} required/>
          </div>
          <div>
          <input class="form-control" type="email" placeholder="Email" value={this.state.email} autocomplete="email"
          onChange={e => this.setState({ email: e.target.value })} required/>
          </div>
          <div>
          <input class="form-control" type="password" placeholder="Password" value={this.state.password} autocomplete="new-password"
          onChange={e => this.setState({ password: e.target.value })} suggested="new-password" required/>
          </div>
          <div>
          <input class="form-control" type="password" placeholder="Repeat password" value={this.state.reppassword} ref={this.repPass}
          onChange={this.validatePassword} required/>
          </div>
          <div>
          <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
          </div>
          <div class="button_pair">
          <button type="button" class="btn btn-danger" onClick={this.clearState} >Cancel</button>
          <button type="submit" class="btn btn-success">Sign Up</button>
          </div>
          <button type="button" class="btn btn-info" onClick={this.routeChange}>Already Have A Login?</button>
          </form>
          </div>
          </section>
          </div>
        );
      }
    }

    export default Profile;
