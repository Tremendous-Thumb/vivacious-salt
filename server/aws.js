var AWS = require('aws-sdk');
require('dotenv').config();
//
AWS.config.update({accessKeyId: process.env.accessKeyId, secretAccessKey: process.env.secretAccessKey});
AWS.config.update({region: 'us-west-2'});

const db = require('./db/sequelize');

let generateUrl = (req, res) => {

  var s3 = new AWS.S3();

  const params = {
    Bucket: process.env.bucket,
    Key: 'vid.MOV',
    ContentType: 'video/quicktime',
    ACL: 'public-read'
  };

  let preSignedUrl = s3.getSignedUrl('putObject', params);
  console.log('what is presign', preSignedUrl);

  let publicUrl = 'https://s3.amazonaws.com/' + params.Bucket + '/' + params.Key;
  // res.send('something');
  res.send({preSignedUrl: preSignedUrl, publicUrl: publicUrl});
};

let createVideoDb = (req, res) => {
  console.log('whats in here', req.body);

  let url = Object.keys(req.body)[0];

  var facebookSession = req.sessionStore.sessions;
  var faceId;
  for (var key in facebookSession) {
    var fid = JSON.parse(facebookSession[key])
    if (fid.passport) {
      faceId = fid.passport.user.id;
    }
  }

  db.User.find({ where: { userId: faceId } })
  .then((user) => {
    console.log('is this valid', user);
    // gets the challenge ID from the selected challenge
    model.Challenge.find({ where: { id: req.body.challengeId } })
      .then((challenge) => {
        // increments the count of number of challenges who accepted challenge
        challenge.increment(['challengers']);
        // saves userId and challengeId in join table
        model.Users_challenge.find({
          userId: user.dataValues.id,
          challengeId: challenge.dataValues.id,
        })
        // creates an entry in proof table for creator of challenge to approve
        .then((usersChallenge) => {
          model.Proof.update({
            usersChallengeId: usersChallenge.dataValues.id,
            creatorAccepted: false,
            media: url
          });
        });
      });
  });

};



module.exports.generateUrl = generateUrl;
module.exports.createVideoDb = createVideoDb;
