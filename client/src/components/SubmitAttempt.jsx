import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {connect} from 'react-redux'




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
  console.log(data);
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'PUT',
      url: data.preSignedUrl,
      processData: false,
      contentType: 'image/png',
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

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: '/presign',
      dataType: 'json',
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
        // var fd = new FormData();
        // fd.append('file', file);
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

// function mapStateToProps(state) {
//   return {
//     userId: currentUser.user ? currentUser.user.id : null
//   };
// }

// export default connect(mapStateToProps, null)(SubmitAttempt);

export default SubmitAttempt;
