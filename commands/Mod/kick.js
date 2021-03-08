const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
    PREFIX,
    approveemoji,
    denyemoji,
    ownerID
} = require(`../../config/config.json`);
const r = "#c219d8";

module.exports = {
    name: `kick`,
    description: `To kick ppl who break rules`,
    aliases: [],
    cooldown: 3,
    edesc: `Type this Command, to kick ppl Usage: ${PREFIX}ban <@user or user or id> <reason> `,
    async execute(message, args, client) {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('OMFG').setDescription(`**${message.author.username}**, don\'t have permission to ban members.`).setTimestamp());
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('OMFG').setDescription(`don't have permission to ban members.`).setTimestamp());
        }
        let toKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        let reason = args.slice(1).join(" ");
        if (!args[0]) return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('ehh really bro smh').setDescription('Please mention someone to kick'));
        if (!toKick) return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('Bruh').setDescription(`${args[0]} is not a member.`))
        if (!reason) return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('BRUH Specify a reason.').setTimestamp());

        if (!toKick.kickable) {
            return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle(':x: I cannot kick someone that is mod/admin. :x:').setTimestamp());
        }

        if (toKick.kickable) {
            let x = new MessageEmbed()
                .setTitle('Kick')
                .addField('Member Kicked', toKick)
                .addField('Kicked by', message.author)
                .addField('Reason', reason)
                .addField('Date', message.createdAt)
                .setThumbnail(`https://tenor.com/view/oh-yeah-high-kick-take-down-fight-gif-14272509`)
                .setColor(r);

            message.channel.send(x);
            toKick.kick();
        }
    }
}
