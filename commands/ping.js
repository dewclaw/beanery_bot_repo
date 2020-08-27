module.exports = {
    name: 'ping',
    description: 'pong',
    execute(m, args) { 
        m.channel.send('Pong.')
    }
}