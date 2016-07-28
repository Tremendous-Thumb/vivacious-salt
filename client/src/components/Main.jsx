import React from 'react';
import ChallengeList from './ChallengeList.jsx';
import UserProfile from './UserProfile.jsx';

const Main = ({ challengeList, entities, currentUser, addPlayer, history, signUpChallenge }) => {

  let profile = (<div>Profle Section is not showing</div>);
  if (currentUser) {
    profile =  (<UserProfile className="profile"
                             challenges={challengeList.items}
                             entities={entities}
                             currentUser={currentUser}
                             addPlayer={addPlayer}
                             signUpChallenge={signUpChallenge}
                             history={history} />);
  }

  return ( 
  <div>
    <div className="row center-align">
      <div className="col s12">
        <div className="card">
          <div className="card-content">
            <p>
            New Challenger is a fun new social web app for challenging your friends to new activities and creating rewards for completion. <br /> Sign up to take other people's challenges and earn rewards! <br />
            <span className='subtext'>Image uploads and smart image verification technology are used to prove if someone completed a challenge. Automated payment to users or charities can be set up with PayPal & Stripe.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    {profile}
    <br />
    <ChallengeList challenges={challengeList.items} entities={entities} currentUser={currentUser} addPlayer={addPlayer} signUpChallenge={signUpChallenge} history={history} />
  </div>
);}

export default Main;