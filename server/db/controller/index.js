const model = require('../sequelize.js');
const deleteChallenge = require('./deleteChallenge.js');
const updateChallenge = require('./updateChallenge.js');
const Promise = require('bluebird');
const detailHelper = require('../helpers.js').detailHelper;

module.exports = {
  user: {
    getAll: (req, res) => {
      // grabs all users and maps to an array to be sent to client
      model.User.findAll()
      .then((users) => {
        var usersAllInfo = [];
        users.map(user => {
          let faceId = user.dataValues.facebookId;
          detailHelper(faceId)
          .then((userInfo) => {
            let fullUserInfo = Object.assign({}, userInfo)
            usersAllInfo.push(fullUserInfo);
            if (usersAllInfo.length === users.length){
              res.json(usersAllInfo.slice());
            }
          });
        });
      });
    },
    get: (req, res) => {
      // gets facebook id saved in passport session
      // information is saved as a string within sessionStore
      const facebookSession = req.sessionStore.sessions;
      console.log('facebook session', req.sessionStore.sessions);
      let faceId;
      for (var key in facebookSession) {
        var fid = JSON.parse(facebookSession[key])
        if (fid.passport && fid.passport.user) {
          faceId = fid.passport.user.id;
        }
      }
      console.log('faceid', faceId);
      // search for user from facebookId req.user is the session information stored in every req
      // model.User.find({ where: { facebookId: req.user.id } })
      detailHelper(faceId)
      .then((userInfo) => {
        return res.json(userInfo);
      });
    },
  },

  challenge: {
    // finds all challenges
    getAll: (req, res) => {
      let challengesArray;
      model.Challenge.findAll()
      .then((challenges) => {
        challengesArray = challenges.map(challenge => challenge.dataValues);

        // takes each challenge and adds requests list of users who have accepted
        // the challenge
        const arrayUsersWhoAcceptedChallenge = challengesArray.map(challenge =>
          model.User.findAll({
            include: [{
              model: model.Challenge,
              where: { id: challenge.id },
            }],
          })
        );

          // This adds challenger names to the array of challenges
        Promise.all(arrayUsersWhoAcceptedChallenge).then((usersAcceptedChallenge) => {
          challengesArray.forEach((challenge, i) => {
            challengesArray[i].challengernames = usersAcceptedChallenge[i].map(user =>
              user.dataValues.name);
          });

          // This adds category name for each challenge
          const arrayChallengeType = challengesArray.map(challenge =>
            model.Type.find({ where: { id: challenge.typeId } }));

          Promise.all(arrayChallengeType).then((types) => {
            challengesArray.forEach((challenge, i) => {
              challengesArray[i].category = types[i].dataValues.name;
            });

            // This adds array of users who have successfully completed challenge
            const arraySuccesses = challengesArray.map(challenge =>
              model.Users_challenge.findAll({
                where: { challengeId: challenge.id },
                include: [{
                  model: model.Proof,
                  where: { creatorAccepted: true },
                }],
              })
            );

            Promise.all(arraySuccesses).then((successesArray) => {
              successesArray.forEach((successes, i) => {
                const array = [];
                if (successes.length > 0) {
                  for (let j = 0; j < successes.length; j++) {
                    array.push(successes[j].dataValues.userId);
                  }
                  challengesArray[i].successUserId = array;
                }
              });

              // This adds the id of all the currentChallengers
              const arrayCurrentChallengers = challengesArray.map(challenge =>
                model.Users_challenge.findAll({
                  where: { challengeId: challenge.id },
                  include: [{
                    model: model.Proof,
                    where: { creatorAccepted: false },
                  }],
                })
              );

              Promise.all(arrayCurrentChallengers).then((currentChallengers) => {
                currentChallengers.forEach((challenger, i) => {
                  const array = [];
                  if (challenger.length > 0) {
                    for (let j = 0; j < challenger.length; j++) {
                      array.push(challenger[j].dataValues.userId);
                    }
                  }
                  challengesArray[i].currentChallengers = array;
                });
                res.json(challengesArray);
              });
            });
          });
        });
      });
    },

    create: (req, res) => {
      // this finds the user using the facebookId from session
      return model.User.find({ where: { id: req.body.userId } })
      // this finds or creates the data for the types table
      .then((user) => {
        return model.Type.findOrCreate({ where: { name: req.body.type } })
      })
      .then((type) => {
        return model.Challenge.create({
          name: req.body.name,
          description: req.body.description,
          url: req.body.url,
          challengers: 0,
          successes: 0,
          userId: req.body.userId,
          typeId: type[0].dataValues.id,
          reward: req.body.reward,
          // end date is two weeks from date created
          endTime: new Date(+new Date + 12096e5),
        });
      })
      .then((challenge) => {
        return res.json({'challengeCreated': true});
      });
        // res.send('Challenge created')
    },

    update: updateChallenge,

    accept: (req, res) => {
      // grabs the userid of the user who accepted the challenge
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
            // increments the count of number of challenges who accepted challenge
            challenge.increment(['challengers']);
            // saves userId and challengeId in join table
            model.Users_challenge.create({
              userId: user.dataValues.id,
              challengeId: challenge.dataValues.id,
              timeAccepted: new Date(),
            })
            // creates an entry in proof table for creator of challenge to approve
            .then((usersChallenge) => {
              model.Proof.create({
                usersChallengeId: usersChallenge.dataValues.id,
                creatorAccepted: false,
              })
              .then((proof) => {
                res.json({'accepted': 'true'});
              });
            });
          });
      });
    },

    delete: deleteChallenge,

    // this will approve the userChallenge in the proof table
    // not implemented yet
    approve: (req, res) => {
      // changes value of approved in proof table to true
      model.Proof.find({ where: { usersChallengeId: req.body.userChallengeId } })
      .then((userChallenge) => {
        userChallenge.updateAttributes({ creatorAccepted: true });
      });
      // finds the challenge and increments the number of successes
      model.Users_challenge.find({ where: { id: req.body.userChallengeId } })
      .then((userChallenge) => {
        model.Challenge.find({ where: { id: userChallenge.challengeId } })
        .then((challenge) => {
          challenge.increment(['successes']);
        });
      });
    },

    // provides information for the admin view
    admin: (req, res) => {
      let adminChallenge;
      // finds current challenge
      model.Challenge.find({ where: {
        id:req.params.challengeId
      }
    })
      .then((challenge) => {
        adminChallenge = challenge.dataValues;
        // finds list of users who have accepted challenge
        model.Users_challenge.findAll({ where: { challengeId: req.params.challengeId } })
        .then((usersChallenges) => {
          const usersArray = usersChallenges.map(userChallenge =>
            model.User.find({ where: userChallenge.dataValues.userId })
          );
          // finds record of all users who accepted challenge and adds to array sent back to client
          Promise.all(usersArray).then((users) => {
            adminChallenge.challengers = users.map(user => user.dataValues);
            res.json(adminChallenge);
          });
        });
      });
    },
  },
};
