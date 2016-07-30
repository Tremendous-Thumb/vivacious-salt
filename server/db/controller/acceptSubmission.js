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

  // gets the user information
  model.User.find({ where: { facebookId: faceId } })
  .then((user) => {
    // gets the challenge ID from the selected challenge
    model.Challenge.find({ where: { id: req.body.challengeId } })
      .then((challenge) => {
        model.Users_challenge.find({
          where: {
            userId: user.dataValues.id,
            challengeId: challenge.dataValues.id
          }
        })
      })
        // creates an entry in proof table for creator of challenge to approve
        .then((usersChallenge) => {
          model.Proof.update({
            creatorAccepted: true
          },
            {
              where: {
                usersChallengeId: usersChallenge.dataValues.id,
              },
          })
          .then((proof) => {
            res.json({'accepted': 'true'});
          });
        });
      });
}
