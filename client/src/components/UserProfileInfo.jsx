import React from 'react';
import ChallengeListEntry from './components/ChallengeListEntry';
import submitChallenge from '../actions/submitChallenge';
import DropZone from 'react-dropzone';

class UserProfileInfo extends React.Component {


  render() {
    return (
      <div>
        <Dropzone ref="dropzone" onDrop={this.onDrop}>
            <div>Proove that you completed your challenge! Drop your file here</div>
        </Dropzone>
        <button type="button" onClick={this.onOpenClick}>
            Open Dropzone
        </button>
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <i class="material-icons prefix">mode_edit</i>
                <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                <label for="icon_prefix2">First Name</label>
              </div>
            </div>
          </form>
        </div>
        <ChallengeListEntry />
      </div>
    );
  }
}

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as challengeActions from './../actions/challengeActions.js';
export default UserProfileInfo;
