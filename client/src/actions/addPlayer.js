export function addPlayer(challengeId, playerId) {
  console.log('add player', challengeId, playerId);
  return {
    type: 'ADD_PLAYER',
    challengeId,
    playerId
  };
}
