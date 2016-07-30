import { findIndex } from 'lodash';

function player(state = {}, action) {
  switch(action.type) {
    case 'ADD_PLAYER':
      return {
        id: action.playerId,
        attemptVisible: false
      };
    case 'TOGGLE_VISIBILITY':
      return Object.assign({}, state, {attemptVisible: !state.attemptVisible});
    default:
      return state;
  }
}

export function playersOfUserChallenges(state = {}, action) {
  const id = action.challengeId;
  var players = state[id] || [];
  switch(action.type) {
    case 'ADD_PLAYER':
      return Object.assign({}, state, {[id]: [...players, player(null, action)]});
    case 'TOGGLE_VISIBILITY':
      const index = findIndex(players, player => player.id === action.playerId)
      return Object.assign({}, state,
        {[id]: [...players.slice(0, index), ...players.slice(index+1), player(players[index], action)]}
      );
    default:
      return state;
  }
}
