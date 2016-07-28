import React from 'react';
import ChallengeListEntry from './ChallengeListEntry.jsx';

//Takes in props.challenges, and maps over to create ChallengeListEntry
class ChallengeList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // before we render the challenge list, we need some information about the user
    // determine which challenges they are currently signed up for
    // send this down
    // this.props.challengesTaken = [];
    // challengesTaken = {this.props.challengesTaken}
  }

  render() {
    let challenges = this.props.challenges.map(id => this.props.entities.challenges[id]);
    console.log('render challenge list');
    return (
      <div>
        {challenges.map((challenge) => {
          return (
            <div key={challenge.id}>
              <ChallengeListEntry challenge={challenge} addPlayer={this.props.addPlayer} currentUser={this.props.currentUser} signUpChallenge={this.props.signUpChallenge} />
            </div>
          );
        })}
      </div>
    );
  }
}

ChallengeList.propTypes = {
  challenges: React.PropTypes.array.isRequired,
  entities: React.PropTypes.object.isRequired
};

export default ChallengeList;
