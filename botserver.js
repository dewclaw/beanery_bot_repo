require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
let ffmpeg = require('ffmpeg');

bot.on('ready', ()=> {
    console.info(`Logged in as ${bot.user.tag}`)
});

bot.on('message', async m=>{
    if(m.member.voice.channel && (m.content === 'fucking move')){
        m.channel.send(`STOP RIGHT THERE CRIMINAL SCUM. NO ONE BREAKS THE LAW ON MY WATCH ${m.author}`)
        const connection = await m.member.voice.channel.join();
        const dispatcher = connection.play('clip1.mp3');
        dispatcher.on('start', ()=>{
            console.log('Audio is now playing.......');
        });
        dispatcher.on('finish', ()=> {
            console.log('Audio has finished playing.....');
            connection.disconnect();
        });
        connection.on('error', (e)=>{
            console.error(e);
            connection.disconnect();
        });
    }
})


bot.login(process.env.TOKEN);
