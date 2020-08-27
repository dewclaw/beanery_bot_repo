module.exports = {
    name: 'fuckingmove',
    description: 'pong',
    async execute(m, args) { 
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
}