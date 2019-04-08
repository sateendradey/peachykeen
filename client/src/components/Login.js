import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import './styles/forms.css';
import './styles/mainstyle.css';
import signin_img from './img/signin-image.jpg';
import LoaderButton from "./LoaderButton";

class Login extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    isValid: false,
    isSuccess: false,
    color: 'danger',
    isLoading: false
  }


  constructor(props) {
    super(props);
    this.onDismissSuccess = this.onDismissSuccess.bind(this);
    this.routeChange = this.routeChange.bind(this);
  }

  onDismissSuccess() {
    this.setState({ isSuccess: false });
  }

  routeChange() {
    let path = `main`;
    this.props.history.push(path);
  }

  handleSubmit = async e => {
    this.setState({ isSuccess: false,
                    isLoading: true});
    e.preventDefault();
    const request = '/profiles/' + this.state.email;
    const response = await fetch(request);
    if (response.status === 404){
      await this.setState({ message: "We could not find the email in our records!",
      isSuccess: true,
      color: 'danger'});
      this.setState({ isLoading: false });
    }
    else{
      const body = await response.json();
      if (body.password === this.state.password){
        sessionStorage.setItem("UserName", body.name);
        sessionStorage.setItem("isAuthenticated", true);
        sessionStorage.setItem("Email", body.email);
        this.setState({ message: "Login successful! Redirecting now!",
        isSuccess: true,
        color: 'success'});
        this.timeoutHandle = setTimeout(()=>{
          this.setState({ isLoading: false });
          this.props.userHasAuthenticated(true);
        }, 2000);

      }
      else{
        await this.setState({ message: "The password you have entered does not match with what we have on file!",
        isSuccess: true,
        color: 'danger'});
        this.setState({ isLoading: false });
      }
    }



  }
  render() {
    return (
      <div className="App">
      <section className="sign-in">
      <div className="container">
      <Alert color={this.state.color} isOpen={this.state.isSuccess} toggle={this.onDismissSuccess}>
      {this.state.message}
      </Alert>
      <div className="signin-content">
      <div className="signin-image">
      <figure><img src={signin_img} alt="Login Man"/></figure>
      <a href="/Signup" className="signup-image-link">Create an account</a>
      </div>
      <div className="signin-form">
      <h3 className="form-title">Login</h3>
      <form className="register-form" id="login-form" onSubmit={this.handleSubmit}>
      <div className="form-group">
      <label for="email"><i className="fas fa-user-alt"></i></label>
      <input name = "email" type="email" placeholder="Email" value={this.state.email} autoComplete="email"
      onChange={e => this.setState({ email: e.target.value })} required/>
      </div>
      <div className="form-group">
      <label for="password"><i className="fas fa-key"></i></label>
      <input name="password" type="password" placeholder="Password" value={this.state.password} autoComplete="current-password"
      onChange={e => this.setState({ password: e.target.value })} required/>
      </div>
      <div className="form-group form-button">
      <LoaderButton
      block
      bsSize="large"
      type="submit"
      isLoading={this.state.isLoading}
      text="Login"
      loadingText=" Logging in…"
      />
      </div>
      </form>
      </div>
      </div>
      </div>
      </section>
      </div>
    );
  }
}

export default Login;
