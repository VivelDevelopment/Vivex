const punishments = require('../../models/ModSchema');
const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
    PREFIX,
    approveemoji,
    denyemoji
} = require(`../../config/config.json`);

module.exports = {
    name: `warn`,
    description: `Warn ppl who break rules`,
    aliases: [],
    cooldown: 3,
    edesc: `Type this Command, to Warn ppl Usage: ${PREFIX}warn <@user>`,
    async execute(message, args, client) {
        let toWarn = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You are not allowed to warn members! BRUH")
        }

        if (message.author.id === toWarn.id) return;

        let reason = args.slice(1).join(" ")

        if (!reason) return message.channel.send('NO REASON!')

        let data = await punishments.findOne({
            GuildID: message.guild.id,
            UserID: toWarn.id
        });

        if (data) {
            data.Punishments.unshift({
                PunishType: 'Warn',
                Moderator: message.author.id,
                Reason: reason,
            });
            data.save();


            message.channel.send(new MessageEmbed().setColor("#c219d8").setDescription("**" + `warned ${toWarn} for \`${reason}\`` + "**").setTimestamp())
        } else if (!data) {
            let newData = new punishments({
                GuildID: message.guild.id,
                UserID: toWarn.id,
                Punishments: [{
                    PunishType: 'Warn',
                    Moderator: message.author.id,
                    Reason: reason,
                },],
            });
            newData.save();

            message.channel.send(new MessageEmbed().setColor("#c219d8").setDescription("**" + `warned ${toWarn} for \`${reason}\`` + "**").setTimestamp())
        }

    }




}
