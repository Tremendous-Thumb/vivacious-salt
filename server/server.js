const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const passportFacebook = require('./passport.js');
const session = require('express-session');
const db = require('./db/controller/index.js');


const app = express();
const port = process.env.PORT || 3000;

global.navigator = { userAgent: 'all' };

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
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/'}),
  function(req, res) {
    // req.user contains session information, can run other functions before redirecting user to new page
    res.redirect('/');
  });

// db routes to get or post information
app.get('/user', db.user.get);
app.get('/challenges', db.challenge.getAll);
app.get('/users', db.user.getAll);
app.get('/userInfo', db.user.get);
app.post('/signup', db.challenge.accept);
app.post('/createChallenge', db.challenge.create);

//https://github.com/reactjs/react-router-tutorial/tree/master/lessons/13-server-rendering
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/public/index.html'));
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
