const model = require('./sequelize.js');

module.exports.detailHelper = function(faceId) {
  let userInfo;
  let userObj;

  return model.User.find({ where: { facebookId: faceId } })
  .then((user) => {
    userObj = user;
    userInfo = user.dataValues;
    console.log('user info in the query', userInfo);
    // search for all challenges created by user
    return model.Challenge.findAll({ where: { userId: user.dataValues.id } })
  })
  .then((challenges) => {
    // saves all challenges created by user to challengesCreated
    userInfo.challengesCreated = challenges.map(challenge => challenge.dataValues);
    // search and save all challenges taken by user
    // search Users_challenges table records with user's id
    return model.Users_challenge.findAll({ where: { userId: userObj.dataValues.id } })
  })
  .then((userChallenges) => {
    // for each entry in Uses'_challenge table search Challenes table for data
    const arrayOfPromises = userChallenges.map(userChallenge =>
       model.Challenge.find({ where: { id: userChallenge.dataValues.challengeId } })
    );

    return Promise.all(arrayOfPromises);
  })
  .then((arrayOfChallengesTaken) => {
    // save all challenesTaken to results.challengesTaken
    userInfo.challengesTaken = arrayOfChallengesTaken
      .map(challengesTaken => challengesTaken.dataValues);
    // search and save all challenges completed and approved
    // search Users_challenges table to find all approved user challenges
    return model.Users_challenge.findAll({
      where: { userId: userObj.dataValues.id },
      include: [{
        model: model.Proof,
        where: { creatorAccepted: true },
      }],
    });
  })
  .then((approvedChallenges) => {
    const arrayOfApprovedChallenges = approvedChallenges
      .map(approvedChallenge => model.Challenge
          .find({ where: approvedChallenge.dataValues.challengeId }));
    return Promise.all(arrayOfApprovedChallenges);
  })
  .then((resolvedChallenges) => {
    userInfo.challengesCompleted = resolvedChallenges.map(challenge =>
      challenge.dataValues);
    // returns object will all users each of the challenges they have created,
    // each of the challenges they have accepted, and each of the challenges they
    // have completed

    return userInfo;
  });
};
