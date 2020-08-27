const fs = require('fs');


module.exports = {
    name: 'help',
    description: 'Help Menu',
    execute(m, commands) { 
        m.channel.send('Here is a list of the available commands and their descriptions.')
        const commandFiles = fs.readdirSync('../commands').filter(file => file.endsWith('.js'));
        for (const command of commandFiles) {
            m.channel.send(`Command Name: !bb ${command.name}, Command Description: ${command.description}`)
        }
    }
}