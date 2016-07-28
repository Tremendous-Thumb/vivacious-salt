import React from 'react';
import Navigation from './Navigation.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Spinner from './Spinner.jsx';
injectTapEventPlugin();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchChallenges();
    this.props.fetchUsers();

    console.log('challenge list', this.props.challengeList.items);
    //Get current user on load
    fetch('/user')
      .then(res => {
        if (!res.ok) {
          console.log('response not ok');
          throw Error(res.statusText);
        }
        return res.json();
       })
      .then(json => {
        this.props.loginUser(json);
      })
      .catch(err => console.log('ERROR GETTING USEA', err));
  }

  render() {
    return (
      <div className="container">
        <Navigation challenges={this.props.challengeList.items} entities={this.props.entities} currentUser={this.props.currentUser} addPlayer={this.props.addPlayer} signUpChallenge={this.props.signUpChallenge} history={this.props.history}/>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}
/* <Spinner hidden={this.props.loading}/> */
//
//Attach store and app actions to App
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appActions from './../actions/appActions.js';

function mapStateToProps(state) {
  return {
    entities: state.entities,
    loading: state.loading,
    currentChallenge: state.currentChallenge,
    challengeList: state.challengeList,
    currentUser: state.currentUser,
    index: state.index,
    playersOfUserChallenges: state.playersOfUserChallenges
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActions, dispatch);
}
const AppRedux = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppRedux;
