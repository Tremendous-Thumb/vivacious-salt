export function receiveUsers(users) {
  return {
    type: 'RECEIVE_USERS',
    entities: {
      users: users.reduce((obj, user) => {
        obj[user.id] = user;
        return obj;
      }, {})
    }
  }
}

export function fetchExtraData(json) {
  return function(dispatch) {
    return fetch('/userInfo')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusTest);
        }
        return res.json();
      })
      .then(json => dispatch(receiveUsers(json)))
      .catch(err => console.log(err));
  }
}

export function fetchUsers(challengeId, userType) {
  return function(dispatch) {
    return fetch('http://localhost:3000/users?origin=true')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        console.log('fetchUsers', res.json());
        return res.json();
      })
      .then(json => dispatch(receiveUsers(json)))
      .catch(err => console.log(err));
  }
}
