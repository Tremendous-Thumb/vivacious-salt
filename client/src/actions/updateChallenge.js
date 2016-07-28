import {fetchChallenges} from './fetchChallenges';
export function updateChallenge(form, challengeId) {
  return dispatch =>
    $.ajax({
      url: '/' + challengeId + '/updateChallenge',
      type: 'POST',
      data: JSON.stringify(form),
      contentType: 'application/json',
      success: function success(data) {
        console.log('success adding challenge', data);
        
        //grab all challenges from server
        // note: this is not the most efficient way to add more challenges.
        dispatch(fetchChallenges());

        // dispatch(createChallengeSuccess(data));
        // createChallengeSuccess is currently an action dispatcher that isn't being received by a reducer
      },
      error: function error(data) {
        console.error('fail', data);
        dispatch(createChallengeFail(data));
      }
    });
}
