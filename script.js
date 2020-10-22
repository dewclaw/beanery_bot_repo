const axios = require('axios');

const baseURL = "https://icanhazdadjoke.com/"

const headers = {
    "Accept": 'application/json',
    "User-Agent": "Andy's Beanery Bot - A Discord Server Bot"
}

const func = () => {
    axios({
        url: baseURL,
        headers: headers,
        method: 'get'
    }).then((res) => {
        console.log(res.data)
    }).catch((error) => {
        console.error(error);
    });
}

func()