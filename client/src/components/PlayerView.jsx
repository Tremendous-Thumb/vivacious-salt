import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

const buttonStyle = {
  margin: 12,
  float: 'right'
};

const playerStyle = {
  fontFamily: 'Acme, sans-serif',
  fontSize: '2em',
  width: '80%',
  overflow: 'hidden',
  float: 'left',
  marginTop: '2%',
  marginLeft: '10%',
  marginRight: '10%'
}

const imageStyle = {
  width: '100%',
  height: '400px',
  overflow: 'hidden'
}

class PlayerView extends React.Component {
  constructor(props) {
    super(props)
    // Grab the challengeId from the url
    // const challengeId = props.params.challengeId;
    // Find the correct challenge from props.entities.challenges
    // this.challenge = props.entities.challenges[challengeId];

    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp() {
    // console.log('currentuser', this.props.currentUser)
    if (!this.props.currentUser) {
      alert('Please log in to sign up for a challenge!');
    } else {
      this.props.signUpChallenge(this.props.currentUser, this.props.params.challengeId);
    }
  }


  render() {
    console.log('render player view');
    const id = this.props.params.challengeId;
    // get challeng info from entities
    const challenge = this.props.entities.challenges[id];
    return (
      <Card style={playerStyle}>
        <CardHeader
          title={challenge.username}
          subtitle=""
        />
        <CardMedia style={imageStyle}>
          <img style={{ height: '400px', objectFit: 'contain' }} src={challenge.url} />
        </CardMedia>
        <CardTitle title={challenge.name} subtitle={challenge.category} />
        <CardText>
          <div>{challenge.description}</div>
          <br />
          <div>${challenge.reward}</div>
          <div>{challenge.successes} out of {challenge.challengers} challengers have completed this currentChallenge! </div>
          <br />
          <div>Current challengers: {challenge.currentChallengers}</div>
          <div>Completed: {challenge.successNames}</div>
          <br />
          <div>Start: {challenge.createdAt} </div>
          <div>End: {challenge.endTime} </div>

        </CardText>
        <CardActions>
          <RaisedButton label="Sign Up!" backgroundColor="#fdd835" style={buttonStyle} onTouchTap={this.handleSignUp}/>
          {(() => {
            console.log(this.props);
            if(challenge.userId === this.props.currentUser.id){
              return <Link to={"/challenges/" + id + "/admin"}><RaisedButton label="Admin Panel" backgroundColor="#fdd835"/></Link>
            }
          })()}
        </CardActions>
      </Card>
    );
  }
}
//Attach store and app actions to App
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as appActions from '../actions/appActions.js';

// function mapStateToProps(state) {
//   return {
//     entities: state.entities,
//     currentChallenge: state.currentChallenge,
//     challengeList: state.challengeList,
//     currentUser: state.currentUser,
//     index: state.index,
//     playersOfUserChallenges: state.playersOfUserChallenges
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(appActions, dispatch);
// }
// const PlayerViewRedux = connect(mapStateToProps, mapDispatchToProps)(PlayerView);

export default PlayerView;
