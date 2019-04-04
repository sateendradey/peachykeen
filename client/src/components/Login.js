import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class Login extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    isValid: false,
    isSuccess: false,
    color: 'danger'
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
    this.setState({ isSuccess: false });
    e.preventDefault();
    const request = '/profile/' + this.state.email;
    const response = await fetch(request);
    if (response.status === 404){
      await this.setState({ message: "We could not find the email in our records!",
                            isSuccess: true,
                            color: 'danger'});
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
        this.props.userHasAuthenticated(true);
        this.timeoutHandle = setTimeout(()=>{
          this.routeChange();
        }, 2000);
      }
      else{
        await this.setState({ message: "The password you have entered does not match with what we have on file!",
                              isSuccess: true,
                              color: 'danger'});
      }
    }


  }
  render() {
    return (
      <div className="App">
      <section id= "signup">
      <h2>Login</h2>
      <div className="form-group">
      <Alert color={this.state.color} isOpen={this.state.isSuccess} toggle={this.onDismissSuccess}>
      {this.state.message}
      </Alert>
      <form onSubmit={this.handleSubmit}>
      <div>
      <input className="form-control" type="email" placeholder="Email" value={this.state.email} autoComplete="email"
      onChange={e => this.setState({ email: e.target.value })} required/>
      </div>
      <div>
      <input className="form-control" type="password" placeholder="Password" value={this.state.password} autoComplete="current-password"
      onChange={e => this.setState({ password: e.target.value })} required/>
      </div>
      <button type="submit" className="btn btn-success">Login</button>
      </form>
      </div>
      </section>
      </div>
    );
  }
}

export default Login;
