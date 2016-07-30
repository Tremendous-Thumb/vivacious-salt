var AWS = require('aws-sdk');
require('dotenv').config();
//
const shortid = require('shortid');

AWS.config.update({accessKeyId: process.env.accessKeyId, secretAccessKey: process.env.secretAccessKey});
AWS.config.update({region: 'us-west-2'});

const db = require('./db/sequelize');

let generateUrl = (req, res) => {

  var s3 = new AWS.S3();

  const params = {
    Bucket: process.env.bucket,
    Key: shortid.generate(),
    ContentType: 'application/octet-stream',
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


  var facebookSession = req.sessionStore.sessions;
  console.log('facebookSession: ', facebookSession);
  var faceId;
  for (var key in facebookSession) {
    var fid = JSON.parse(facebookSession[key]);
    if (fid.passport) {
      faceId = fid.passport.user.id;
    }
  }

  db.User.find({ where: { facebookId: faceId } })
  .then((user) => {
    console.log('is this valid', user);
    // gets the challenge ID from the selected challenge
    db.Challenge.find({ where: { id: req.body.challengeId } })
      .then((challenge) => {
        // increments the count of number of challenges who accepted challenge
        // db.challenge.increment(['challengers']);
        // saves userId and challengeId in join table
        db.Users_challenge.find({
          userId: user.dataValues.id,
          challengeId: challenge.dataValues.id,
        })
        // creates an entry in proof table for creator of challenge to approve
        .then((usersChallenge) => {
          console.log('am i getting here', usersChallenge.dataValues.id);
          db.Proof.update({
            media: req.body.publicUrl
          }, {where: {usersChallengeId: usersChallenge.dataValues.id }});
        })
        .then((challenge) => {
          console.log('whats this', challenge);
        });
      });
  });

  db.Users_challenge.findOne({
    media: req.body.publicUrl
    // console.log('found url');
  });

};



module.exports.generateUrl = generateUrl;
module.exports.createVideoDb = createVideoDb;
