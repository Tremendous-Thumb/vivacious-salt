import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { App, Main, Login, UserProfile, ChallengeContainer, AdminPanel,
        ChallengeCreateForm, PlayerView, SubmitAttempt, SubmissionReview }


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
            <Route path=":challengeId/admin" component={AdminPanel} />
            <Route path=":challengeId/submissionReview" component={SubmissionReview} />
            <Route path=":challengeId/submission" component={SubmitAttempt} />
          </Route>
          <Route path="login" component={Login} />
          <Route path="users/:userId" component={UserProfile} >
            <Route path="submission" component={UserProfileInfo} />
          </Route>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
  ), document.getElementById('app')
);
