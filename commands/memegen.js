let axios = require('axios');
const API_URL="https://api.imgflip.com/caption_image";
const {prefix} = require('../config.json');
const memeTemplate = {
    frank: "274932328"
}

module.exports = { 
    name: 'memegen',
    description: 'Generates a new meme. Only supports Frank the Tank',
    async execute(m, args) {
        let longArgs = m.content.slice(prefix.length).trim().split(/"(.*?)"/)
        console.log(args)
        console.log(longArgs)
        let text0 = longArgs[1];
        let text1 = longArgs[3];
        await axios({
            method: 'post',
            url: API_URL,
            params: {
                    template_id: memeTemplate.frank,
                    username: process.env.MEME_USERNAME,
                    password: process.env.MEME_PASSWORD,
                    text0: text0,
                    text1: text1,
            }
        }).then(async (res) => {
            // console.log(res)
            await m.channel.send(res.data.data.url);
        }).catch((err) => {console.log(err)})
    }
}