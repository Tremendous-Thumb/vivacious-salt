import React from 'react';
import PendingApprovalListEntry from './PendingApprovalListEntry.jsx';

const PendingApprovalList = ({ players, handleClick, entities, challengeId}) => (
  <div>
    <h4>Current Challengers:</h4>
    {(()=> {
      console.log('players in approval list', players, Array.isArray(players));
      if (players) {
        console.log('lets map');
        return players.map(player => {
          return <PendingApprovalListEntry challengeId={challengeId} player={player} key={player.id} handleClick={handleClick.bind(null, player.id)} entities={entities} />
        });
      } else {
        console.log('no players', players);
      }
    })()}
      </div>
      );

      PendingApprovalList.propTypes = {
      handleClick: React.PropTypes.func.isRequired
      };

      export default PendingApprovalList;
