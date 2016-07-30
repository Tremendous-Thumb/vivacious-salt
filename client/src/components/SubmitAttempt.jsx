import React from 'react';
import Dropzone from 'react-dropzone';



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

let postVideoS3 = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'PUT',
      url: data.preSignedUrl,
      processData: false,
      contentType: 'application/octet-stream',
      data: data.file,
      success: function() {
        resolve(data);
      },
      error: function() {
        reject('did not upload to s3');
      }
    });
  });
};

let postValidUrlS3 = (data) => {
  console.log('is this puyblic url', data.publicUrl);
  console.log('is this challenge id', data.challengeId);
  let obj = {publicUrl: data.publicUrl, challengeId: data.challengeId};
  return new Promise((resolve, reject) => {

    $.ajax({
      type: 'POST',
      url: '/presign',
      dataType: 'application/json',
      data: obj,
      success: function() {
        resolve(data);
        return console.log('this url is sent to aws');
      },
      error: function() {
        return console.log('didnt get sent');
      }
    });
  });
};





class SubmitAttempt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  componentWillMount() {
    //check if user is logged
    if (!this.props.currentUser) {
      this.context.router.push('/');
    }
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }


  onDrop(files) {
    this.setState({
      files: files
    });
  }

  onSubmit(e) {
    e.preventDefault();

    getUrl()
      .then((data) => {

        data.challengeId = this.props.params.challengeId;
        data.file = this.state.files[0];
        return postVideoS3(data);
      })
      .then((sendUrl) => {
        console.log('is this the url', sendUrl);
        return postValidUrlS3(sendUrl);
      })
      .catch((err) => {
        throw err;
      });

  }




  render() {
    return (
      <div>
        <Dropzone ref="dropzone" onDrop={this.onDrop}>
          <div></div>
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
