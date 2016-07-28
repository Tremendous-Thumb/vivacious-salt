var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('./config/config.js');
var model = require('./db/sequelize.js')

passport.serializeUser(function(user, done) {
  // let userId;
  // console.log('serialize user', user);
  // if (Array.isArray(user)) {
  //   userId = user[0].id;
  // } else {
  //   userId = user.id;
  // }
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
  // console.log('deserialize with ', id);
  // return model.User.findOne({
  //   where: {
  //     id: id
  //   }
  // })
  // .then((user) => done(null, user))
  // .catch((err) => done(err, null));
});

// strategy used to connect to Facebook using Passport OAuth
passport.use(new FacebookStrategy({
   clientID : config.facebookAuth.clientID,
   clientSecret : config.facebookAuth.clientSecret,
   callbackURL : config.facebookAuth.callbackURL,
   enableProof: true,
   profileFields : ['id', 'name', 'displayName', 'picture', 'emails']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
      // information received back from facebook.  The user is then added to
      // database if new user
      model.User.sync().then(function(){
        model.User.findOrCreate(
          {
            where: {
              facebookId: profile.id
            },
            defaults: {
              name: profile.displayName,
              email: profile.emails[0].value,
              url: profile.photos[0].value,
            }
          }
        ).spread(function(user, created) {
          console.log('created: ', created);

        })

        done(null, profile);
      })
    });
  }
));
