const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
    PREFIX,
    approveemoji,
    denyemoji,
    ownerID
} = require(`../../config/config.json`);

module.exports = {
    name: `ban`,
    description: `To ban ppl who break rules`,
    aliases: [],
    cooldown: 3,
    edesc: `Type this Command, to set a snipes Usage: ${PREFIX}ban <@user or user or id> <reason> `,
    async execute(message, args, client) {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('OMFG').setDescription(`**${message.author.username}**, don't have permission to ban members.`).setTimestamp());
        }
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('OMFG').setDescription(`**${message.author.username}**, I do not have perms to ban someone`).setTimestamp())
        }

        let toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);
        let reason = args.slice(1).join(" ");
        if (!args[0]) return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('ehh really bro').setDescription('Please mention someone to ban'));
        if (!toBan) return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('Bruh').setDescription(`${args[0]} is not a member.`));
        if (!reason) return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle('BRUH Specify a reason.').setTimestamp());

        if (!toBan.bannable) {
            return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle(':x: I cannot ban someone that is mod/admin. :x:').setTimestamp());
        }

        if (toBan.bannable) {
            let x = new MessageEmbed()
                .setTitle('Ban')
                .addField('Member Banned', toBan)
                .addField('Banned by', message.author)
                .addField('Reason', reason)
                .addField('Date', message.createdAt)
                .setThumbnail(`https://tenor.com/view/oprah-and-you-get-a-ban-ban-gif-10045949`)
                .setColor("#c219d8");

            message.channel.send(x);
            toBan.ban();
        }
    }
}
// const toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);