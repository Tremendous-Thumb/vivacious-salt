import React from 'react';
import Dropzone from 'react-dropzone';

var SubmitAttempt = React.createClass({
  getInitialState: function() {
      return {
        files: []
      };
  },
  componentWillMount: function() {
    //check if user is logged
    if(!this.props.currentUser) {
      this.context.router.push('/');
    }
  },
  onDrop: function (files) {
    this.setState({
      files: files
    });
  },
  onOpenClick: function() {
    this.refs.dropzone.open();
  },

  submit: function() {
    console.log('uploading files');
    // ajax call goes here
  },

  render: function () {
    return (
      <div>
        <Dropzone ref="dropzone" onDrop={this.onDrop}>
            <div>Drag your video or image proving succussful challenge here. IM HEREERERE</div>
        </Dropzone>
        <div>
          <button onClick={this.onOpenClick}> Attach File </button>
          <button onClick={this.submit}>Submit Proof</button>
        </div>
        {this.state.files.length > 0 ? <div>
        <h2>Uploading {this.state.files.length} files...</h2>
        <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
        </div> : null}
      </div>
    );
  }
});

export default SubmitAttempt;
