import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import merge from 'lodash/merge';

//Import Reducers here
import { challengeList } from './challengeList.js';
import { playersOfUserChallenges } from './playersOfUserChallenges';

// add new or update challenges and users
function entities(state = { users: {}, challenges: {} }, action) {
  if (action.entities) {

    return merge({}, state, action.entities);
  }
  return state;
}

function currentChallenge(state = 1, action) {
  //console.log(state, action);
  return state;
}
function currentUser(state = null, action) {
  if (action.user) {
    console.log('there is a user logged in', action.user);
    return action.user;
  }
  return state;
}

const rootReducer = combineReducers(    
  {entities, currentUser, playersOfUserChallenges, challengeList, routing: routerReducer}   
);    
    
export default rootReducer;