import React from 'react';
import ChallengeList from './ChallengeList.jsx';

const UserProfile = ({challenges, currentUser, entities, addPlayer, signUpChallenge }) => {
  const idsToChallenges = function(challenges) {
    return challenges.map(challenge => {
      return challenge.id;
    });
  };
  return (
    <div>
      <div>
        <img src={currentUser.url || ''} alt=""></img>
        <span>
          <div>{currentUser.username}</div>
          <div>{currentUser.email}</div>
        </span>
      </div>
      <div>
        <h3>My Challenges</h3>
        {idsToChallenges(currentUser.challengesCreated || []) ? (<ChallengeList challenges={idsToChallenges(currentUser.challengesCreated || [])} entities={entities} currentUser={currentUser} addPlayer={addPlayer} signUpChallenge={signUpChallenge} history={history} />) : (<div />)}
        <br />
      </div>
      <div>
        <h4>Current Challenges</h4>
        {idsToChallenges(currentUser.challengesTaken || []) ? (<ChallengeList challenges={idsToChallenges(currentUser.challengesTaken || [])} entities={entities} currentUser={currentUser} addPlayer={addPlayer} signUpChallenge={signUpChallenge} history={history} />) : (<div />)}
        <br />
      </div>
      <div>
        <h4>Completed Challenges</h4>
        {idsToChallenges(currentUser.challengesCompleted || []) ? (<ChallengeList challenges={idsToChallenges(currentUser.challengesCompleted || [])} entities={entities} currentUser={currentUser} addPlayer={addPlayer} signUpChallenge={signUpChallenge} history={history} />) : (<div />)}
        <br />
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  entities: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired 
};

export default UserProfile;
