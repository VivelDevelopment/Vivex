const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
    PREFIX,
    approveemoji,
    denyemoji
} = require(`../../config/config.json`);


module.exports = {
    name: `unban`,
    description: `To unban ppl`,
    aliases: [],
    cooldown: 3,
    edesc: `Type this Command, to unban ppl Usage: ${PREFIX}unban <id> <reason> `,
    async execute(message, args, client) {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('OMFG').setDescription(`**${message.author.username}**, don't have permission to unban members.`).setTimestamp());
        }
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('OMFG').setDescription(`**${message.author.username}**, I do not have perms to unban someone`).setTimestamp())
        }
        let reason = args.slice(1).join(" ");
        let userID = args[0]

        if (!reason) return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('BRUH Specify a reason.').setTimestamp());
        if (!args[0]) return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('You must state someone to unban `\`unban using id\`').setTimestamp())


        message.guild.fetchBans().then(async bans => {
            if (bans.size == 0) return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('This server doesn\'t have anyone banned').setTimestamp())
            let bUser = bans.find(b => b.user.id == userID)
            if (!bUser) return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('The user stated id is not banned').setTimestamp())
            await message.guild.members.unban(bUser.user, reason).catch(e => {
                console.log(e)
                return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle("ERROR").setDescription(`There is error ${e}`).setTimestamp())
            }).then(() => {
                message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle("DONE").setDescription(`Done unbanned ${args[0]}`).setTimestamp())
            })
        })
    }
}
