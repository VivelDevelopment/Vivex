const Discord = require("discord.js")
const { TOKEN, PREFIX, AVATARURL, BOTNAME, } = require(`../config/config.json`);


module.exports = async (client, message) => {
    if (message.author.bot) return;
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        member: message.member,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
}