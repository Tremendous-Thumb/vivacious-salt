import React from 'react';
import ChallengeList from './ChallengeList.jsx';

<<<<<<< 55d29fe651c9a3327766271d037a3cd6e536e75b
const UserProfile = ({challenges, currentUser, entities, addPlayer, signUpChallenge }) => {
  
  const idsToChallenges = function(challenges) {
    return challenges.map(challenge => {
      return challenge.id;
    });
  };

=======
// THIS IS NOT BEING USED RIGHT NOW, NO ROUTES TO IT
const UserProfile = ({ entities, currentUser }) => {
  console.log('what is this', currentUser);
  console.log('is this valid', entities);
  const user = entities.users[currentUser];
  const idsToChallenges = function(ids) {
    return ids.map(id => entities.challenges[id]);
  };
>>>>>>> 'modified user submission'
  return (
    <div>
      <div className="card">
        <img src={currentUser.url || ''} alt=""></img>
        <span>
          <div>{currentUser.username}</div>
          <div>{currentUser.email}</div>
        </span>
      </div>
      <div className="row card">
        <div className="card-content">
          <h3 className="row center-align">My Challenges</h3>
          {idsToChallenges(currentUser.challengesCreated || []) ? (<ChallengeList challenges={idsToChallenges(currentUser.challengesCreated || [])} entities={entities} currentUser={currentUser} addPlayer={addPlayer} signUpChallenge={signUpChallenge} history={history} />) : (<div />)}
        </div>
      </div>
      <div className="row card">
        <div className="card-content">
          <h4 className="row center-align">Current Challenges</h4>
          {idsToChallenges(currentUser.challengesTaken || []) ? (<ChallengeList challenges={idsToChallenges(currentUser.challengesTaken || [])} entities={entities} currentUser={currentUser} addPlayer={addPlayer} signUpChallenge={signUpChallenge} history={history} />) : (<div />)}
        </div>
      </div>
      <div className="row card">
        <div className="card-content">
          <h4 className="row center-align">Completed Challenges</h4>
          {idsToChallenges(currentUser.challengesCompleted || []) ? (<ChallengeList challenges={idsToChallenges(currentUser.challengesCompleted || [])} entities={entities} currentUser={currentUser} addPlayer={addPlayer} signUpChallenge={signUpChallenge} history={history} />) : (<div />)}
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  entities: React.PropTypes.object.isRequired,
<<<<<<< 55d29fe651c9a3327766271d037a3cd6e536e75b
  currentUser: React.PropTypes.object.isRequired 
=======
  currentUser: React.PropTypes.number.isRequired
>>>>>>> 'modified user submission'
};

export default UserProfile;
