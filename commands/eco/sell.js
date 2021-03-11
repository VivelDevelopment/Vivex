const Discord = require('discord.js')
const db = require('quick.db')

const {
    PREFIX,
    approveemoji,
    denyemoji,
    ownerID
} = require(`../../config/config.json`);
module.exports = {
    name: "sell",
    description: `to sell items and get some money`,
    aliases: [],
    cooldown: 3,
    edesc: `to sell items and get some money Usage: ${PREFIX}sell <item>`,
    async execute(message, args, client) {


        let user = message.author;

        if (args[0] == 'nikes') {
            let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`<:Cross:618736602901905418> You don't have Nikes to sell`);

            let nikeses = await db.fetch(`nikes_${message.guild.id}_${user.id}`)

            if (nikeses < 1) return message.channel.send(Embed2)

            db.fetch(`nikes_${message.guild.id}_${user.id}`)
            db.subtract(`nikes_${message.guild.id}_${user.id}`, 1)

            let Embed3 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`<:Check:618736570337591296> Sold Fresh Nikes For 600 Coins`);

            db.add(`money_${message.guild.id}_${user.id}`, 600)
            message.channel.send(Embed3)
        } else if (args[0] == 'car') {
            let Embed2 = new Discord.RichEmbed()
                .setColor("#FFFFFF")
                .setDescription(`<:Cross:618736602901905418> You don't have a Car to sell`);

            let cars = await db.fetch(`car_${message.guild.id}_${user.id}`)

            if (cars < 1) return message.channel.send(Embed2)

            db.fetch(`car_${message.guild.id}_${user.id}`)
            db.subtract(`car_${message.guild.id}_${user.id}`, 1)

            let Embed3 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`<:Check:618736570337591296> Sold a Car For 800 Coins`);

            db.add(`money_${message.guild.id}_${user.id}`, 800)
            message.channel.send(Embed3)
        } else if (args[0] == 'mansion') {
            let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`<:Cross:618736602901905418> You don't have a Mansion to sell`);

            let houses = await db.fetch(`house_${message.guild.id}_${user.id}`)

            if (houses < 1) return message.channel.send(Embed2)

            db.fetch(`house_${message.guild.id}_${user.id}`)
            db.subtract(`house_${message.guild.id}_${user.id}`, 1)

            let Embed3 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`<:Check:618736570337591296> Sold a Mansion For 1200 Coins`);

            db.add(`money_${message.guild.id}_${user.id}`, 1200)
            message.channel.send(Embed3)
        } else if (args[0] == 'drip') {
            let Embed2 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`<:Cross:618736602901905418> You don't have a drip to sell`);

            let drip = await db.fetch(`drip_${message.guild.id}_${user.id}`)

            if (drip < 1) return message.channel.send(Embed2)

            db.fetch(`drip_${message.guild.id}_${user.id}`)
            db.subtract(`drip_${message.guild.id}_${user.id}`, 1)

            let Embed3 = new Discord.MessageEmbed()
                .setColor("#FFFFFF")
                .setDescription(`<:Check:618736570337591296> Sold a drip For 4000 Coins`);

            db.add(`money_${message.guild.id}_${user.id}`, 4000)
            message.channel.send(Embed3)
        };

    }

};
