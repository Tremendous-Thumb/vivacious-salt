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

let postVideoS3 = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'PUT',
      url: data.preSignedUrl,
      processData: false,
      contentType: 'plain/text',
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



class SubmitAttempt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: 'shit'
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
    // var form = new FormData();
    // var data = this.state.files;
    // console.log('is this videp', data[0]);
    // var blob = new Blob([data[0]], {type: 'image/png'});
    // form.append('blob', blob);
    // getUrl()
    //   .then((data) => {
    //     console..log('this url');
    //     // data.file = form;
    //     // console.log('file data', data.file);
    //     console.log('whats kind of data is this', data);
    //     return postVideoS3(data);
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });

    getUrl()
      .then((data) => {
        var file = document.getElementById('file').files[0];

        var fd = new FormData();
        fd.append('file', file);

        $.ajax({
          url: data.preSignedUrl,
          data: fd,
          processData: false,
          contentType: false,
          type: 'PUT',
          success: function(data){
            console.log("sent");
          }
        });
      });

    // getUrl()
    //   .then((data) => {
    //     var file = document.getElementById('file').files[0];
    //     var fd = new FormData();
    //
    //     fd.append("file", file);
    //
    //     var xhr = new XMLHttpRequest();
    //
    //     xhr.addEventListener("load", function () {
    //       console.log("uploaded");
    //     }, false);
    //
    //     xhr.open('PUT', data.preSignedUrl, true); //MUST BE LAST LINE BEFORE YOU SEND
    //     xhr.send(fd);
    //   });
  }






  render() {

    return (
      <div>
        <Dropzone ref='dropzone' onDrop={this.onDrop.bind(this)} >
          <div>Drop YOUR PROOF HERE</div>
        </Dropzone>
        <input type="file" name="file" id="file"/>
        <button type="button" onClick={this.onOpenClick.bind(this)}>
                 Open Dropzone
        </button>
        <button type="button" onClick={this.onSubmit.bind(this)} >
          Submit Video
        </button>

      </div>
    );
  }
}

export default SubmitAttempt;
