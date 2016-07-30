const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const passportFacebook = require('./passport.js');
const session = require('express-session');
const db = require('./db/controller/index.js');
const model = require('./db/sequelize.js');
const mid = require('./middleware.js');
const app = express();
const port = process.env.PORT || 3000;

global.navigator = { userAgent: 'all' };
process.setMaxListeners(0);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/public')));

// enables passport sessions to will store information from facebook
app.use(session({
  secret: 'vivacious-salt',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// routes for facebook authentication and return path after authentication
app.get('/auth/facebook', passport.authenticate('facebook',
  {
    scope: 'email',
  }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/'}),
  function(req, res) {
    // req.user contains session information, can run other functions before redirecting user to new page
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

// db routes to get or post information
app.get('/user', db.user.get);
app.get('/challenges', mid.protectApi, db.challenge.getAll);
app.get('/users', mid.protectApi, db.user.getAll);
app.get('/userInfo', db.user.get);
app.get('/:challengeId/admin/getChallengers', db.challenge.admin);
app.post('/:challengeId/admin/acceptSubmission', db.challenge.acceptSubmission);
app.get('/:challengeId/admin/viewSubmission', db.challenge.getSubmissionData);
app.post('/signup', mid.checkMultipleSignUp, db.challenge.accept);
app.post('/cancel', db.challenge.cancel);
app.post('/createChallenge', db.challenge.create);
app.post('/:challengeId/updateChallenge', db.challenge.update);
app.get('/:challengeId/delete', db.challenge.delete);


//https://github.com/reactjs/react-router-tutorial/tree/master/lessons/13-server-rendering
app.get('/splash', function(req, res) {
  console.log('splash', path.join(__dirname, '/../client/public/splash.html'));
  res.sendFile(path.join(__dirname, '/../client/public/splash.html'));
});

app.get('/', mid.isLoggedIn, function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/src/index.html'));
});

app.get('*', mid.isLoggedIn, function(req, res) {
  res.redirect('/');
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
