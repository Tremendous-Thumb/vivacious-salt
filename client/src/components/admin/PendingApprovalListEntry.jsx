import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

const pStyle = {
  margin: 0
}

const nameStyle = {
  marginTop: '20px',
  marginBottom: 0,
  fontWeight: 'bold'
}

const PendingApprovalListEntry = ({player, handleClick, entities, challengeId }) => {
  // grab user info from entities using player id
  const data = entities.users[player.id];
  player.attemptVisible = true;
  console.log('i have a player', player);
  data.attempt = true;
  return (
    <div className="pendingApproval">
      {/* click will toggle attemptVisible prop of player */}
      <div className="row">
        <div className="col s6" >
          <p style={nameStyle}>{player.name}</p>
        </div>
        {/* check if we should render player's submission */}
        {(() => {
          if(player.attemptVisible && data.attempt){
            return (
              <div>
                <Link to={"/challenges/" + challengeId + "/" + player.id + "/submissionReview"}>View Submission</Link>
              </div>
            );

          } else {
            return (
            <div className="col s6">
              <p style={pStyle}>Not attempted</p>
            </div>
            );
          }
        }
        )()}
      </div>
    </div>
  );
};

PendingApprovalListEntry.propTypes = {
  player: React.PropTypes.object.isRequired,
  handleClick: React.PropTypes.func.isRequired
};

export default PendingApprovalListEntry;
