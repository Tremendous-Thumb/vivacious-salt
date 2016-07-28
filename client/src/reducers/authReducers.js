export function authorizeUsers(state = {}, action) {
  switch(action.type) {
    case 'LOGIN_USER':
      return Object.assign({}, state, {
        // something about being logged in
        currentUser: action.user
      });
    default:
      return state;
  }
}
