const Discord = require("discord.js")
const { TOKEN, PREFIX, AVATARURL, BOTNAME, } = require(`../config/config.json`);
const figlet = require('figlet')

module.exports = client => {
    console.log(`${client.user.username} is online`)
    setInterval(() => {

        client.user.setActivity(`Type: ${PREFIX}help | ${client.guilds.cache.size} Server`, { type: "WATCHING" });


    }, (5000));


    client.user.setStatus('dnd')
    figlet.text(`${client.user.username} ready!`, function (err, data) {
        if (err) {
            console.log('Something went wrong');
            console.dir(err);
        }
        console.log(`═════════════════════════════════════════════════════════════════════════════`);
        console.log(data)
        console.log(`═════════════════════════════════════════════════════════════════════════════`);
    })

}