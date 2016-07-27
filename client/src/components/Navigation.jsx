import React from 'react';
import { Link } from 'react-router';

//Navigation bar was made with materialize, not Material UI
const Navigation = () => (
  <nav className="yellow darken-2">
    <Link to="/"><span className="title">New Challenger</span></Link>
    <span className="login"><a href="/auth/facebook"><img src="./images/facebook-login-button.png" onClick="" /></a></span>
    <span className="logout"><a href="/logout">Log Out</a></span>
    <Link to="/challenges/create"><span className="right linkStyle">Create Challenge</span></Link>
  </nav>
);

export default Navigation;
