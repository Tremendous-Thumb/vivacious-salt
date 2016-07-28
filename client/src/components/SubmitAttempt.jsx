import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
//
let getUrl = () => {
  return fetch('/presign')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('is this what im expecting', data);
      return data;
    })
    .catch((err) => {
      console.log('didnt get anything');
    });
};
//
// axios.get('/presign')
//   .then((response) => {
//     console.log('whats the response', reponse);
//   })

class SubmitAttempt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  componentWillMount() {
    //check if user is logged
    if(!this.props.currentUser) {
      this.context.router.push('/');
    }
  }

  onDrop(files) {
    this.setState({
      files: files
    });
  }

  onOpenClick() {
    this.refs.dropzone.open();
    // $.ajax({
    //   type: 'GET',
    //   url: '/presign',
    //   contentType: 'aplication/json',
    //   sucess: function(data) {
    //     console.log('got data', data);
    //   },
    //   error: function() {
    //     console.log('error');
    //   }
    // })
    getUrl();

  }


  submit() {

  }
  // console.log('request here', request);

  render() {
    return (
      <div>
        <Dropzone ref="dropzone" onDrop={this.onDrop}>
          <div>Drag your video or image proving succussful challenge here. IM HEREERERE</div>
        </Dropzone>
        <div>
          <button onClick={this.onOpenClick.bind(this)}> Attach File </button>
          <button onClick={this.submit.bind(this)}>Submit Proof</button>
        </div>
        {this.state.files.length > 0 ? <div>
          <h2>Uploading {this.state.files.length} files...</h2>
          <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
        </div> : null}
      </div>
    );
  }
}

export default SubmitAttempt;
