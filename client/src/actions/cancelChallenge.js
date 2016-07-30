import { fetchChallenges } from './fetchChallenges.js'

export function cancelChallenge(currentUser, challengeId) {
  return function(dispatch) {
    console.log('inside leaving challenge action');
    console.log('currentUser', currentUser, 'challengeId', challengeId);
    return fetch('http://localhost:3000/cancel', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: currentUser,
        challengeId: challengeId,
      })
    }).then(res => {
      if (!res.ok) {
        console.log('error in posting leaving challenge', err)
      }
      console.log(res);
      return res.json();
    }).then(json => dispatch(fetchChallenges(json)))
    .catch(err => console.log('error in receiving challenges back after signup', err));
  }
}