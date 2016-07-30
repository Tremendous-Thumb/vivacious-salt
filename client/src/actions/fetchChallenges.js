import { fetchUsers } from './fetchUsers';

export function receiveChallenges(challenges) {
  return {
    type: 'RECEIVE_CHALLENGE_LIST',
    challenges: challenges.map(challenge => challenge.id),
    entities: {challenges: challenges.reduce((obj, challenge) => {
      obj[challenge.id] = challenge;
      return obj;
    }, {})},
    receivedAt: Date.now()
  }
}

export function fetchChallenges() {
  return function(dispatch) {
    return fetch('http://localhost:3000/challenges?origin=true')
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        console.log('fetch')
        return res.json();
       })
      .then(json => dispatch(receiveChallenges(json)))
      .then(() => dispatch(fetchUsers()))
      .catch(err => console.log(err))
  }
}
