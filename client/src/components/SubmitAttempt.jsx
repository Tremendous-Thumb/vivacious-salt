import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';



let s3Url;

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

let postVideoS3 = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'PUT',
      url: data.preSignedUrl,
      processData: false,
      contentType: 'video/webm',
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

// getUrl()
//   .then((data) => {
//     data.file = this.state.files;
//     // console.log('file data', data.file);
//     console.log('whats kind of data is this', data);
//     return postVideoS3(data);
//   })
//   .catch((err) => {
//     throw err;
//   });

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

  onDrop(file) {
    this.setSate({
      files: file
    });
    console.log('received:', this.state.files);
  }



    // let myDropzone;
    // initCallback(dropzone) {
    //   myDropzone = dropzone;
    // }
    //
    // removefile() {
    //   if (myDropzone) {
    //     myDropzone.removeFile();
    //   }
    // }




  render() {

    return (
      <div>
        <Dropzone ref='dropzone' onDrop={this.onDrop.bind(this)} >
          <div>Drop YOUR PROOF HERE</div>
        </Dropzone>
        {this.state.files.length > 0 ? <div>
          <h2>Uploading {this.state.files.length} files...</h2>
          <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
        </div> : null}
      </div>
    );
  }
}

export default SubmitAttempt;
