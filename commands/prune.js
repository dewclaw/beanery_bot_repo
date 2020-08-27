module.exports = {
    name: 'prune',
    description: 'pong',
    execute(m, args) { 
        m.channel.bulkDelete(100, true).catch(err=>{
            console.error(err);
            m.channel.send(`There was an error pruning the messages... I'm not programmed to do anything else.`)
        })
    }
}