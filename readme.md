# Andy's Beanery Bot

Andy's Beanery Bot is an open source Discord bot built on top of the Discord.JS library for NodeJS. 
# Features & Technologies

The Beanery Bot utilizes various web API's and services to deliver its features.
    1. !bb dadjoke [optional:tts] - utilizes free API https://icanhazdadjoke.com/ 
        desc: This command simply pulls a random dadjoke from above API and shares it back to the channel that requested it. There is an optional tts argument that can added to have the discord client Text To Speach the content.
    2. !bb memegen [required:"text-a"] [required:"text-b"] - Utilizes free api https://api.imgflip.com/
        desc: This command will generate a new "Frank The Tank" meme with "text-a" and "text-b" at top and bottom, respectively. The bot will make the appropriate requests and send back a message with the meme URL to the requesting channel. 
        Areas for improvement:
            (a) - We can switch on [required:"meme-name"] argument to add a library of memes to choose from.
            (b) - Maybe we can use AWS document processing API to get the text off the image and then give an option to Text To Speach back to the channel
    3. !bb detectface [required:"IMG-URL"] or [required:"IMAGE:ATTACHMENT"] - Utilizes AWS Rekognition API & Celebrity Rekognitio API to shoot back to the channel meta-data about the image.
        Desc: This command parses whether an image was uploaded as an attachment or in URL. Makes an HTTP request to the image, downloads it temporarily and encodes it in Base64. It then connects to AWS Rekognition and sends it for image processing. After a response, we send it again to AWS Rekognition Celebrity to and return an embded message with the linked image. If there is a celeb detected, it will publish celebrity information. If not, it will publish the meta-deta about the image.
        Areas for improvement:
            (a) - Code needs to be refactored
            (b) - Build a web client/front end, and instead keep a server side library of all image requests. We then embed the messages image-url to the client, and publish all meta-data there. The meta-data shared in the discord channel is limited.
    4. This readme.md is not finished. 

# Installation 

You can simply pull down a copy of the repo, make any edits you would like and then re-upload to a git repo of your choice. The bot for our server is hosted on a Heroku Dyno. Don't forget to add your own bot Token in the environment variables. 

# Commands explained

Still working on the documentation....... This project is not finished or necessarily meant to be put out into 'production'. This repo is really just a place for me to store my work on the project.

## Contributing

Pull requests are welcome and encouraged. 

## License
[MIT](https://choosealicense.com/licenses/mit/)