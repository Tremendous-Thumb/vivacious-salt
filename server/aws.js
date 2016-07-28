var AWS = require('aws-sdk');
require('dotenv').config();
//
AWS.config.update({accessKeyId: process.env.accessKeyId, secretAccessKey: process.env.secretAccessKey});
AWS.config.update({region: 'us-west-1'});
//
let generateUrl = (req, res) => {

  var s3 = new AWS.S3();

  const params = {
    Bucket: process.env.bucket,
    Key: 'ruwefhewfe',
    Expires: 600,
    ContentType: 'video/webm',
    ACL: 'public-read'
  };

 //  s3.upload(parms, function(err, data) {
 //    if (err) {
 //     console.log("Error uploading data: ", err);
 //   } else {
 //     console.log("Successfully uploaded data to myBucket/myKey");
 //   }
 // });

  let preSignedUrl = s3.getSignedUrl('putObject', params);
  console.log('what is presign', preSignedUrl);

  let publicUrl = 'https://s3.amazonaws.com/' + params.Bucket + '/' + params.Key;
  // res.send('something');
  res.send({preSignedUrl: preSignedUrl, publicUrl: publicUrl})
};
//   s3.createBucket({Bucket: 'myBucket'}, function() {
//
//   // var params = {Bucket: 'myBucket', Key: 'myKey', Body: 'Hello!'};
//
//   s3.putObject(params, function(err, data) {
//
// //       if (err)
// //
// //           console.log(err)
// //
// //       else       console.log("Successfully uploaded data to myBucket/myKey");
// //
// //    });
// //
// // });
// //
// // };
//
//


module.exports.generateUrl = generateUrl;
