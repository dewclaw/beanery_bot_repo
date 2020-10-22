module.exports = {
    name:"ttscheck",
    description: "debugging tts",
    async execute(m,args) {
        console.log("testing text to speach message")
        m.channel.send("Test of text to speach", {
            tts: true
        });
    }
}