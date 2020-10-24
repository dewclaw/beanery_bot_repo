const { ProcessCredentials } = require('aws-sdk');
require('dotenv').config();
var AWS = require('aws-sdk');
var fs = require('fs');
var axios = require('axios');
function getBase64(url) {
    return axios
      .get(url, {
        responseType: 'arraybuffer'
      })
      .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  }
  let myURL="https://www.thestatesman.com/wp-content/uploads/2017/08/1493458748-beauty-face-517.jpg"

AWS.config.update({
    region: 'us-east-2',
})
// var photo = fs.readFileSync('./photo.jpg', 'base64');
// console.log(process.env.AWS_REGION);
const client = new AWS.Rekognition({region: "us-east-2"});
getBase64(myURL).then((res) => {
    params = { 
        "Image": {
            'Bytes': new Buffer.from(res,'base64'),
        },
        "Attributes" : [
            "ALL"
        ]
    }
    client.detectFaces(params, (err, response) => {
        if (err) { 
            console.log(err)
        } else {
            const faceDetails = response.FaceDetails[0];
            console.log(faceDetails);
        }
    })

}).catch((err) => {
    console.error(err)
})
// params = { 
//     "Image": {
//         'Bytes': new Buffer.from(photo,'base64'),
//     },
//     "Attributes" : [
//         "ALL"
//     ]
// }
// client.detectFaces(params, (err, response) => {
//     if (err) { 
//         console.log(err)
//     } else {
//         const faceDetails = response.FaceDetails[0];
//         // console.log(faceDetails);
//     }
// })
