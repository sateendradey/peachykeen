import React, { Component } from 'react';
import logo from './logo.svg';
import './team08.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <section id= "signup">
          <h2>Signup</h2>
          <div class="form-group">
            <div>
              <input class="form-control" type="text" placeholder="Name" required />
            </div>
            <div>
              <input class="form-control" type="email" placeholder="Email" required />
            </div>
            <div>
              <input class="form-control" type="password" placeholder="Password" required />
            </div>
            <div>
              <input class="form-control" type="password" placeholder="Repeat password" required />
            </div>
            <div class="terms">
              <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
            </div>
            <div>
              <button type="button" class="btn btn-danger">Cancel</button>
              <button type="submit" class="btn btn-success">Sign Up</button>
            </div>
            <button type="submit" class="btn btn-info">Already Have A Login?</button>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
