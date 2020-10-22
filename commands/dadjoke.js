const axios = require('axios');

const baseURL = "https://icanhazdadjoke.com/"

const headers = {
    "Accept": 'application/json',
    "User-Agent": "Andy's Beanery Bot - A Discord Server Bot. Repo @ https://github.com/dewclaw/beanery_bot_repo"
}

module.exports = { 
    name: 'dadjoke',
    description: 'Pulls a random dad-joke from icanhazdadjoke.com api',
    async execute(m, args) {
        axios({
            url: baseURL,
            headers: headers,
            method: 'get'
        }).then((res) => {
            console.log(args);
            m.channel.send(res.data.joke, {tts: args == 'tts' ? true : false});
        }).catch((error) => {
            console.error(error);
        });       
    }
}