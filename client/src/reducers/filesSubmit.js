import SUBMIT_CHALLENGE from '../actions/submitChallenge';
export default function(state = {}, action) {
  switch(action.type) {
    case SUBMIT_CHALLENGE:
      return {...state, file: action.payload}
  }
}
