const model = require('../sequelize.js');
const Promise = require('bluebird');


module.exports = function(req, res) {
  var facebookSession = req.sessionStore.sessions;
  var faceId;
  for (var key in facebookSession) {
    var fid = JSON.parse(facebookSession[key])
    if (fid.passport) {
      faceId = fid.passport.user.id;
    }
  }
  let userIdFromBody = req.body.userId
  let challengeFromFind;
  // gets the user information
  model.User.find({ where: { facebookId: faceId } })
  .then((user) => {
    // gets the challenge ID from the selected challenge
    model.Challenge.find({ where: { id: req.params.challengeId } })
      .then((challenge) => {
        challengeFromFind = challenge;
        console.log('accepting challenge', challenge.dataValues.id, userIdFromBody);
        return model.Users_challenge.find({
          where: {
            userId: userIdFromBody,
            challengeId: challenge.dataValues.id
          }
        })
      })
        // creates an entry in proof table for creator of challenge to approve
        .then((usersChallenge) => {
          console.log('userchallenge', usersChallenge);
          return model.Proof.update({
            creatorAccepted: true
          },
            {
              where: {
                usersChallengeId: usersChallenge.dataValues.id,
              },
          })
          .then((proof) => {
            model.User.find({
              where: {
                id: userIdFromBody
              }
            })
            .then((user) => {
              let currentPoints = user.points;
              console.log('current points', user.points);
              console.log('updating user', user.name);
              model.User.update({
                points: currentPoints + challengeFromFind.reward
              },
              {
                where: { id: userIdFromBody } })
            })


            res.json({'accepted': 'true'});
          });
        });
      });
}
