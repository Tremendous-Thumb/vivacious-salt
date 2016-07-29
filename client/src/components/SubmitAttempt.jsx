import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';




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
//
let postVideoS3 = (data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'PUT',
      url: data.preSignedUrl,
      processData: false,
      contentType: 'image/png',
      data: data.file,
      success: function() {
        resolve(data);
        console.log('sent');
      },
      error: function() {
        reject('did not upload to s3');
      }
    });
  });
};
//
// let postValidUrlS3 = (data) => {
//   console.log('is this public url', data.publicUrl);
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       type: 'POST',
//       url: '/presign',
//       data: data.publicUrl,
//       success: function() {
//         resolve(data);
//       },
//       error: function() {
//         reject('did not send public url');
//       }
//     });
//   });
// };



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

    return getUrl()
      .then((data) => {
        data.file = this.state.files;
        return postVideoS3(data)
      })
      // .then((sendUrl) => {
      //   return postValidUrlS3(sendUrl)
      // })
      // .catch((err) => {
      //   throw err;
      // });
  }


  render() {

    return (
      <div>
        <Dropzone ref='dropzone' onDrop={this.onDrop.bind(this)} >
          <div>Drop YOUR PROOF HERE</div>
        </Dropzone>
        {/*<input type="file" name="file" id="file"/>*/}
        <button type="button" onClick={this.onOpenClick.bind(this)}>
                 Open Dropzone
        </button>
        <button type="button" onClick={this.onSubmit.bind(this)} >
          Submit Video
        </button>
          {this.state.files.length > 0 ? <div>
          <h2>Uploading {this.state.files.length} files...</h2>
          <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
          </div> : null}
      </div>
    );
  }
}

export default SubmitAttempt;
