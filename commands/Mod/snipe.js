const { Client, Collection, MessageEmbed } = require(`discord.js`);
const Discord = require(`discord.js`)
const {
    PREFIX,
    approveemoji,
    denyemoji
} = require(`../../config/config.json`);


module.exports = {
    name: `snipe`,
    description: `To get snipes`,
    aliases: [],
    cooldown: 3,
    edesc: `Type this Command, to set a snipes Usage: ${PREFIX}snipe `,
    async execute(message, args, client) {
        const msg = client.snipes.get(message.channel.id)

        const noMessage = new Discord.MessageEmbed()
            .setColor("#c219d8")
            .setTitle("**There is nothing to snipe. BOOMER**")
            .setFooter("bruh man don't be BOOMER")
            .setTimestamp();

        if (!msg) {
            return message.channel.send(noMessage)
        }
        const embed = new Discord.MessageEmbed()
            .setColor("#c219d8")
            .setAuthor(msg.author, msg.member.user.displayAvatarURL())
            .setDescription(msg.content)
            .setImage(msg.image)
            .setFooter('Get Sniped lmfao')
            .setTimestamp();
        message.channel.send(embed);
    }
}
