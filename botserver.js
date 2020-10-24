const fs = require('fs');

require('dotenv').config();

const Discord = require('discord.js');

const bot = new Discord.Client();
bot.commands = new Discord.Collection(); 

let ffmpeg = require('ffmpeg');

const {prefix} = require('./config.json');


const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
    console.log(`Command ${command.name} added to collection` )
}

bot.on('ready', ()=> {
    console.info(`Logged in as ${bot.user.tag}`)
});

bot.on('message', async m=>{
    // console.log(`Logging M at start`);
    let originalMessage = m;
    if(!m.content.startsWith(prefix) || m.author.bot ) return;
    // const args = m.content.slice(prefix.length).trim().split(/ +/);
    const args = m.content.slice(prefix.length).trim().split(' ');

    const command = args.shift().toLowerCase();

    if(!bot.commands.get(command)){
        return m.reply(`That command does not exist, please use the, bb help, command to see what commands are available.....`);
    } 

    try {
        console.log(command);
        await bot.commands.get(command).execute(m, args,originalMessage)
    } catch (error) {
        console.error(error);
        m.reply('There was an error trying to execute that command....')
    }

    // if (command==='args-info'){
    //     if(!args.length){
    //         return m.channel.send(`You didn't provide any arguements, ${m.author}`)
    //     }
    //     m.channel.send(`Command name: ${command}\nArguments: ${args}`);
    // }
    // !bb fucking move 
    // if((command ===  'fucking-move' || command === 'fuckingmove') && m.member.voice.channel) {

    // }
    // if(command == 'kick') {
    //     if(!m.mentions.users.size) {
    //         return m.reply('You need to tag a user to kick them......');
    //     }
    //     const taggedUser = m.mentions.users.first();
    //     m.channel.send(`You want to kick ${taggedUser}? `);
    // }
    // else if (command == 'prune' || command == 'clear'){
        
    //     m.channel.bulkDelete(100, true).catch(err=>{
    //         console.error(err);
    //         m.channel.send(`There was an error pruning the messages... I'm not programmed to do anything else.`)
    //     })
    // }
})

try {
    bot.login(process.env.TOKEN);

} catch (error) {
    console.error(error)
}
