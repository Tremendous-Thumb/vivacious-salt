import React from 'react';

class ChallengeContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const passedProps = {
      entities: this.props.entities,
      currentChallenge: this.props.currentChallenge,
      createChallenge: this.props.createChallenge,
      updateChallenge: this.props.updateChallenge,
      signUpChallenge: this.props.signUpChallenge,
      currentUser: this.props.currentUser,
      loginUser: this.props.loginUser,
      playersOfUserChallenges: this.props.playersOfUserChallenges,
      adminClick: this.props.adminClick,
      addPlayers: this.props.addPlayers,
    };
    //Pass some store props to challengeContainer's children
    let self = this;
    console.log('this children', this.props.children);
    return (
      <div>
        {this.props.children && React.cloneElement(self.props.children, passedProps)};
      </div>
    )
  }
}

//Attach challenge actions to challenge container
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as challengeActions from './../actions/challengeActions.js';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(challengeActions, dispatch);
}

export default connect(null, mapDispatchToProps)(ChallengeContainer);
