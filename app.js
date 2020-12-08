require('dotenv').config();
let express = require('express');
const AWSHelper = require('./awsHelper');
const awsHelper = require('./awsHelper');
let app = express();
const fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-2',
});

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

app.get('/', (req,res) => {
    res.json({message: "working"});
});
app.get('/upload', (req,res) => {
        // Read content from the file
        const fileName = "IMG_1007.jpg";
        

        // Setting up S3 upload parameters

        fs.readdirSync('./bb_photo_reactions').forEach(file => {
            const fileContent = fs.readFileSync('./bb_photo_reactions/' + file);
            console.log(file);
                    // Uploading files to the bucket
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: file, // File name you want to save as in S3
                Body: fileContent,
                ContentType: "image/jpeg"
            };
            s3.upload(params, (err, data) => {
                if (err) {
                    res.json(err);
                    throw err;
                }
                console.log(`File uploaded successfully. ${data.Location}`);
            });
          });
})
app.get('/list', (req,res) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        // Key: fileName, // File name you want to save as in S3
        // Body: fileContent,
        // ContentType: "image/jpeg"
    };
    s3.listObjects(params, (err,data)=> {
        if(err) {
            res.json(err);
            console.error(err);
        } else {
            res.json(data);
            data.Contents.forEach(file => {
                console.log(file.Key);
            });
        }
    })
})
app.get('/download', (req,res) => {
    params = { 
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "IMG_1007.jpg"
    }
    s3.getObject(params, (err,data) => {
        if(err) { 
            console.error(err);
            res.json(err)
        } else { 
            console.log(data.Body);
            res.json(data.Body);
        }
    })
})
app.listen(3000, () => {
    console.log("Server listening 3000");
    console.log(process.env.AWS_BUCKET_NAME);
});
