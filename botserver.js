// introducing env variables
require('dotenv').config();
// discordjs library
const Discord = require('discord.js');
// Get new Bot Client
const bot = new Discord.Client();
// Video / Audio encoder/decoder
let ffmpeg = require('ffmpeg');

// configuartion file import
const {prefix} = require('./config.json');


bot.on('ready', ()=> {
    console.info(`Logged in as ${bot.user.tag}`)
});

bot.on('message', async m=>{

    if(!m.content.startsWith(prefix) || m.author.bot ) return;
    // const args = m.content.slice(prefix.length).trim().split(/ +/);
    const args = m.content.slice(prefix.length).trim().split(' ');

    const command = args.shift().toLowerCase();

    if (command==='args-info'){
        if(!args.length){
            return m.channel.send(`You didn't provide any arguements, ${m.author}`)
        }
        m.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }
    // !bb fucking move 
    if((command ===  'fucking-move' || command === 'fuckingmove') && m.member.voice.channel) {
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
    if(command == 'kick') {
        if(!m.mentions.users.size) {
            return m.reply('You need to tag a user to kick them......');
        }
        const taggedUser = m.mentions.users.first();
        m.channel.send(`You want to kick ${taggedUser}? `);
    }
    else if (command == 'prune' || command == 'clear'){
        m.channel.bulkDelete(100, true).catch(err => {
            console.error(err);
            m.channel.send('There was an error trying to remove the messages in this channel.' ); 
        }
    }
})


bot.login(process.env.TOKEN);
