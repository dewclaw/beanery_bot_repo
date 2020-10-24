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
  let myURL="https://media.vanityfair.com/photos/5f0e0825345d8ab7a6f2b117/3:2/w_3000,h_2000,c_limit/JohnnyDepp-2020-GettyImages-1256114971.jpg"
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
        // "Attributes" : [
        //     "ALL"
        // ]
    }
    client.detectFaces(params, (err, plebResponse) => {
        if (err) { 
            console.log(err)
        } else {
            client.recognizeCelebrities(params, (err, celebResponse) => {
                if(err) {
                    console.log(err)
                } else {
                    if(!celebResponse.CelebrityFaces[0]){
                        console.log("Not celeb")
                        console.log(plebResponse.FaceDetails);
                    } else {
                        console.log("celeb")
                        console.log(celebResponse.CelebrityFaces[0].Name, celebResponse.CelebrityFaces[0].MatchConfidence);
                    }
                }
            })
            const faceDetails = plebResponse;
            console.log("regular image response")
            // console.log(faceDetails);
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
