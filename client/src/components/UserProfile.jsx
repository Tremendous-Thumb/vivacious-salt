import React from 'react';
import ChallengeList from './ChallengeList.jsx';

const UserProfile = ({ entities, currentUser }) => {
  const user = entities.users[currentUser.id];
  console.log('user', entities);
  const idsToChallenges = function(ids) {
    return ids.map(id => entities.challenges[id]);
  };
  console.log('profile rendered');
  return (
    <div>
      <div>
        <img src={user.url || ''} alt=""></img>
        <span>
          <div>{user.username}</div>
          <div>{user.email}</div>
        </span>
      </div>
      <div>
        <h3>My Challenges</h3>
        <ChallengeList challenges={idsToChallenges(user.challengesCreated || [])} />
      </div>
      <div>
        <h4>Current Challenges</h4>
        <ChallengeList challenges={idsToChallenges(user.challengesTaken || [])} />
      </div>
      <div>
        <h4>Completed Challenges</h4>
        <ChallengeList challenges={idsToChallenges(user.challengesCompleted || [])} />
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  entities: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired 
};

export default UserProfile;
