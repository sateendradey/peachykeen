import React, { Component } from 'react';
import curly_peach from "./img/curly-peach.png"
import four from "./img/orange4.png"

class NotFound extends Component {

  render() {
    return (
      <div className="App">
      <section id= "signup">
      <h2>Sorry!</h2>
      <div>
      <img class="oop" src={four}/>
      <img class="oop" src={curly_peach}/>
      <img class="oop" src={four}/>
      </div>
      <div id="announcement" class="jumbotron">
      Oops! Seems like you're lost!
      <br/>
      <p>{"We couldn't peach out the page you were looking for!"}</p>
      </div>
      </section>
      </div>
    );
  }
}

export default NotFound;
