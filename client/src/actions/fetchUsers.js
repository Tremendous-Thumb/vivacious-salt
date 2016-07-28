export function receiveUsers(users) {
  return {
    type: 'RECEIVE_USERS',
    entities: {
      users: users.slice()
    }
  };
}

<<<<<<< 1c5b1d51e2e088dd1f914cd8dc5ae1988cf5ce45
// export function loading() {
//   return {
//     type: 'LOADING',
//     payload: {
//
//     }
//   }
// }
//
// export function doneLoading() {
//   return {
//     type: 'DONE_LOADING',
//     payload: {
//
//     }
//   }
// }

export function fetchUsers(challengeId, userType) {
  return function(dispatch) {
    // dispatch(loading());

    return fetch('http://localhost:3000/users?origin=true')
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        // dispatch(doneLoading());
        return res.json();
      })
      .then(json => dispatch(receiveUsers(json)))
      .catch(err => console.log(err));
  };
}
