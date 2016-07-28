import React from 'react';
import { Link } from 'react-router';

//Navigation bar was made with materialize, not Material UI
const Navigation = ({challenges, currentUser, entities, addPlayer, signUpChallenge }) => {

  let toProfile = (<div />);

  if (currentUser && entities) {
    toProfile = (<Link to={'/users/' + currentUser.id}><span className="right linkStyle">Profile</span></Link>);
  }

  return (
    <nav className="yellow darken-2">
      <Link to="/"><span className="title">New Challenger</span></Link>
      <span className="logout right linkStyle"><a href="/logout">Log Out</a></span>
      {toProfile}
      <Link to="/challenges/create"><span className="right linkStyle">Create Challenge</span></Link>
    </nav>
  );
}

export default Navigation;
