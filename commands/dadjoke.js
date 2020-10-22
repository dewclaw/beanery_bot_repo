const axios = require('axios');

const baseURL = "https://icanhazdadjoke.com/"

const headers = {
    "Accept": 'application/json',
    "User-Agent": "Andy's Beanery Bot - A Discord Server Bot"
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
            console.log(res.data)
            m.channel.send(res.data.joke, {tts: true});
        }).catch((error) => {
            console.error(error);
        });       
    }
}