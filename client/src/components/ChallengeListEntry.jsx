import React from 'react';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


const buttonStyle = {
  margin: 12,
  float: 'right',
  color: 'white'
};

const cardStyle = {
  fontFamily: 'Acme, sans-serif',
  fontSize: '2em',
  width: '30%',
  height: '450px',
  overflow: 'hidden',
  float: 'left',
  margin: '1%'
};

const titleStyle = {
  height: '50px',
  overflow: 'hidden'
};

const textStyle = {
  height: '100px',
  overflow: 'hidden'
};

const imageStyle = {
  width: '100%',
  height: '200px',
  overflow: 'hidden'
};


// Needs more styling depending on fields
class ChallengeListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSignUp() {
    if (!this.props.currentUser) {
      alert('Please login to sign up for this challenge :)');
    } else {
      console.log('currentuser', this.props.currentUser, 'challengeid', this.props.challenge.id);
      this.props.signUpChallenge(this.props.currentUser, this.props.challenge.id);
    }
  }

  handleClick(e) {
    const id = this.props.challenge.id;
    this.props.challenge.currentChallengers.forEach(playerId => { this.props.addPlayer(id, playerId); });
    // const loc = this.props.challenge.userId === this.props.currentUser.id ? `/challenges/${id}/admin` : `/challenges/${id}`;
    // don't go straight to admin view. Admins may want to see what it looks like to challengers. Give admins an optional button
    // to see the admin version
    this.context.router.push(`/challenges/${id}`);
  }

  render() {
    let moneyClass = 'bling';
    if(this.props.challenge.reward < 0) {
      moneyClass = 'pay';
    }
    return (
      <Card style={cardStyle} >
        <CardMedia style={imageStyle} onClick={this.handleClick}>
          <img style={{ height: '200px', objectFit: 'contain' }} src={this.props.challenge.url} />
        </CardMedia>
        <CardTitle style={titleStyle} title={this.props.challenge.name} subtitle={this.props.challenge.category} />
        <CardText style={textStyle}>
          <div className="reward">This challenge is worth <span className={moneyClass}>${this.props.challenge.reward}</span></div>
          <div>{this.props.challenge.description}</div>
          <br />
          <div>{this.props.challenge.successes} out of {this.props.challenge.challengers} challengers have completed this challenge! </div>
        </CardText>
        <CardActions>
          <RaisedButton label="Sign Up!" style={buttonStyle} backgroundColor="#fdd835" onTouchTap={this.handleSignUp}/>
        </CardActions>
      </Card>
    );
  }
}

ChallengeListEntry.propTypes = {
  challenge: React.PropTypes.object.isRequired
};

ChallengeListEntry.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ChallengeListEntry;
