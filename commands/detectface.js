// const { ProcessCredentials } = require('aws-sdk');
require('dotenv').config();
var AWS = require('aws-sdk');
var axios = require('axios');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { url } = require('inspector');

AWS.config.update({
    region: 'us-east-2',
})

// Helper function
function getBase64(url) {
    return axios
      .get(url, {
        responseType: 'arraybuffer'
      })
      .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  }

module.exports = { 
    name: 'detectface',
    description: 'Utilizes AWS Rekognition API to gather meta-data about the photo',
    async execute(m, args, originalMessage) {
        let url = ""
        const client = new AWS.Rekognition({region: "us-east-2"});
        console.log('detect face hit');
        if(originalMessage.attachments.first()) {
            url = originalMessage.attachments.first().url
        } else if (args[0]){
            url = args[0];
        } else {
            m.channel.send("invalid requst")
        }
        getBase64(url).then(async (res) => {
            console.log("image downloaded");
            const params = { 
                "Image": {
                    'Bytes': new Buffer.from(res,'base64'),
                },
                "Attributes" : [
                    "ALL"
                ]
            }
            console.log("running through AWS")
            client.detectFaces(params, async (err, plebResponse) => {
                console.log("Finished")
                if (err) { 
                    console.log(err)
                } else {
                    client.recognizeCelebrities({ 
                        "Image": {
                            'Bytes': new Buffer.from(res,'base64'),
                        },
                    }, async (err, celebResponse) => {
                        if(err) { 
                            console.log(err)
                        }else { 
                            if(!celebResponse.CelebrityFaces[0]){
                                console.log("Not celeb")
                                console.log("setting faceDetails")
                                const faceDetails = await plebResponse.FaceDetails[0];
                                // console.log(faceDetails)
                                let messageDetails = {
                                    ageLow: faceDetails.AgeRange.Low,
                                    ageHigh: faceDetails.AgeRange.High,
                                    smilingConfidence: faceDetails.Smile.Confidence,
                                    genderDetails: {
                                        value: faceDetails.Gender.Value,
                                        confidence: faceDetails.Gender.Confidence
                                    },
                                    emotion: {
                                        type: faceDetails.Emotions[0].Type,
                                        confidence: faceDetails.Emotions[0].Confidence
                                    } 
                                }
                                console.log(messageDetails)
                                const embedMessage = new MessageEmbed()
                                .setTitle("Beanery Bot - Aritifical Intelligence Image Processing")
                                .setDescription(`
                                \n Image Details: \n 
                                Age Range: ${messageDetails.ageLow} years - ${messageDetails.ageHigh} years \n 
                                Gender: ${messageDetails.genderDetails.value}, Confidence: %${messageDetails.genderDetails.confidence} \n
                                I am %${messageDetails.emotion.confidence} confident this person is ${messageDetails.emotion.type} \n
                                `)
                                .setImage(url)
                                m.channel.send(embedMessage);
                            } else {
                                console.log("celeb")
                                console.log(celebResponse.CelebrityFaces[0].Name, celebResponse.CelebrityFaces[0].MatchConfidence);
                                const embedMessage = new MessageEmbed()
                                .setTitle("Beanery Bot - Aritifical Intelligence Image Processing")
                                .setDescription(`
                                \n Image Details: CELEB DETECTED \n 
                                Celeb name: ${celebResponse.CelebrityFaces[0].Name} Confidence: %${celebResponse.CelebrityFaces[0].MatchConfidence}
                                `)
                                .setImage(url)
                                m.channel.send(embedMessage);
                            }
                        }
                    })
                    
                    // const attachment = new MessageAttachment(url);
                    // m.channel.send(`
                    // \n Image Details: \n 
                    // Age Range: ${messageDetails.ageLow} years - ${messageDetails.ageHigh} \n 
                    // Gender: ${messageDetails.genderDetails.value}, Confidence: ${messageDetails.genderDetails.confidence}% \n
                    // I am ${messageDetails.emotion.confidence}% confident this person is ${messageDetails.emotion.type} \n
                    // `, attachment);
                }
            })
        
        }).catch((err) => {
            console.error(err)
        })
    }
}