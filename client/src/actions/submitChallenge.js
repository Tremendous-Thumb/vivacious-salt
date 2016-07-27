const SUBMIT_CHALLENGE = 'SUBMIT_CHALLENGE';
import axios from 'axios';

export function submitChallenge (files) {
  const request = axios.post('/users/:userId/submission', files);
  return {
    type: SUBMIT_CHALLENGE,
    payload: request
  };
}
