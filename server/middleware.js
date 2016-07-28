const getUserInfo = require('./db/helpers.js').detailHelper;
const model = require('./db/sequelize.js');
module.exports.protectApi = function(req, res, next) {
  if (req.query.origin) {
    console.log('works - youre throught to getting all users');
    next();
  } else {
    console.log('you broke');
    res.redirect('/');
  }
}

module.exports.checkMultipleSignUp = function (req, res, next) {
  const facebookSession = req.sessionStore.sessions;
  console.log('facebook session', req.sessionStore.sessions);
  let faceId;
  for (var key in facebookSession) {
    var fid = JSON.parse(facebookSession[key])
    if (fid.passport) {
      faceId = fid.passport.user.id;
    }
  }
  return getUserInfo(faceId)
    .then((userInfo) => {
      console.log('userInfo!', userInfo)
      console.log('current challenge id', req.body.challengeId);
      const challengeIds = userInfo.challengesTaken.map(challenge => challenge.id);
      if(challengeIds.indexOf(req.body.challengeId) >= 0) {
        console.log('user is already signed up for this challenge')
        return res.json({'accepted': 'user has already accepted this challenge'});
      } else {
        return next();
      }
    });
}

module.exports.isLoggedIn = function (req, res, next) {
<<<<<<< 170d661ff44afb4d228902b56a3ceeef53e5fe13
  console.log('checking if logged in');
  if (!req.isAuthenticated() || !req.session) {
    console.log('redirecting to splash');
=======
  console.log('checking sessionstore', req.sessionStore)
  if (!res.sessionStore || !req.sessionStore.sessions) {
>>>>>>> remove polka dots
    return res.redirect('/splash');
  }
  console.log('authorized!');
  return next();
};
