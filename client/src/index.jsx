import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { App, Main, Login, UserProfile, ChallengeContainer, AdminChallenge,
        ChallengeCreateForm, PlayerView, SubmitAttempt }
from './components/Components.js';

import { Provider } from 'react-redux';
import store, { history } from './store';

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Main} />
          <Route path="challenges" component={ChallengeContainer}>
            <Route path="create" component={ChallengeCreateForm} />
            <Route path=":challengeId" component={PlayerView} />
            <Route path=":challengeId/admin" component={AdminChallenge} />
            <Route path=":challengeId/submission" component={SubmitAttempt} />
          </Route>
          <Route path="login" component={Login} />
          <Route path="users/:userId" component={UserProfile} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
  ), document.getElementById('app')
);
