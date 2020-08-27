module.exports = {
    name: 'kick',
    description: 'pong',
    execute(m, args) { 
        if(!m.mentions.users.size) {
            return m.reply('You need to tag a user to kick them......');
        }
        const taggedUser = m.mentions.users.first();
        m.channel.send(`You want to kick ${taggedUser}? `);
    }
}