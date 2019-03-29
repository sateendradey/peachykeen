import React, { Component } from 'react';
import logo from './img/Peach-Logo.png';
import res_img from './img/restaurant-img.jpg';

class About extends Component {
  render() {
    return (
      <div className="App">
      <section id= "landing_image">
      <img src={res_img} alt="Restaurant" />
      </section>
      <section id= "about">
      <h2>About Us</h2>
      <p>{"Peachy Keen started as a small restaurant review website for Katy, Texas, locals in 2008. Due to its simplicity, pleasant design, and depth of information, the website has grown substantially since that time. Peachy Keen now boasts over 1 million restaurant listings across all 50 states. Peachy Keen’s only product has been information, mainly restaurant menus, locations, and user reviews."}</p>
      <p>{"Peachy Keen aims to make the process of deciding where to eat easier. Through our simple and intuitive web app, swipe to select restaurants that you are in the mood for and we'll keep a track of what you selected. Filter results based on your mood or desired dining experience, and the app will narrow your searches. Read reviews, view menu, and search locations to make sure you have all the annoying aspects of eating out sorted even before you leave your house. When you're at the restaurant, focus on what's most important: Stuffing your face!!!"}</p>
      </section>
      <section id = "contact">
      <h2>Contact Peaches!</h2>
      <div id = "image_div">
      <img src={logo} alt="Peaches Logo" />
      </div>
      <p>Reach out to use for more information or if you have any feedback! </p>
      <details>
      <summary>Contact Details</summary>
      <p id="address">Address</p>
      <p id="address1">4242 Earthen Moon Road</p>
      <p id="address1">College Station</p>
      <p id="address1">TX 77840</p>
      <p id="phone">Phone: (979) 111-1111</p>
      <p id="email">Email: can_I_talk_to_your_manager@peachykeen.com</p>
      </details>
      </section>
      </div>
    );
  }
}

export default About;
