const repelUser = (m) => {
    const billianID = "362379779749576725"
    const dewclawID = "140275999798460416"
    s3.listObjects({Bucket: process.env.AWS_BUCKET_NAME}, (err,data) => {
        if(err) { 
            console.error(err);
            m.channel.send("Error");
        } else { 
            randomImageLocation = getRandomIntInclusive(0, data.Contents.length);
            imageKey = data.Contents[randomImageLocation].Key;
            console.log(imageKey);
            if(!imageKey){
                m.channel.send("Error finding image");
            }
            console.log("BEING RAN")
            params = { 
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: imageKey
            }
            s3.getObject(params, (error,objectData) => {
                if(error) { 
                    console.error(error);
                    m.channel.send("ERROR DOWNLOADING OBJECT");
                } else { 
                    const attachment = new MessageAttachment(objectData.Body, "image.jpeg");
                    if(m.author.id === dewclawID && !m.attachment) { 
                        console.log("Author has posted an image");
                        m.channel.send(`${m.author} Please enjoy this image `, attachment);
                    }
                }
            })
        }
    })
}
module.exports = repelUser;
