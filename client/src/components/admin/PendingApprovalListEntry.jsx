import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const pStyle = {
  margin: 0
}

const nameStyle = {
  marginTop: '20px',
  marginBottom: 0,
  fontWeight: 'bold'
}

const PendingApprovalListEntry = ({player, handleClick, entities }) => {
  // grab user info from entities using player id
  const data = entities.users[player.id];
  // player.attemptVisible = true;
  // data.attempt = true;
  return (
    <div className="pendingApproval">
      {/* click will toggle attemptVisible prop of player */}
      <div className="row">
        <div className="col s6" >
          <p style={nameStyle}>{data.name}</p>
        </div>
        {/* check if we should render player's submission */}
        {(() => {
          if(player.attemptVisible && data.attempt){
            return (
              <div>
                <div className="col s3">
                  <RaisedButton
                    label="Accept"
                    backgroundColor="#31a81d"
                    onClick={handleClick}/>
                </div>
                <div className="col s3">
                  <RaisedButton
                    label="Reject"
                    backgroundColor="#bf302b"
                    onClick={handleClick}/>
                </div>
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
