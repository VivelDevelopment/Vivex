const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms");

const {
  PREFIX,
  approveemoji,
  denyemoji,
  ownerID
} = require(`../../config/config.json`);
module.exports = {
  name: "work",
  description: `to work and get money`,
  aliases: [],
  cooldown: 3,
  edesc: `to work and get money Usage: ${PREFIX}work `,
  async execute(message, args, client) {

    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 600000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));

      let timeEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Cross:618736602901905418> You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
      message.channel.send(timeEmbed)
    } else {

      let replies = ['Programmer', 'Builder', 'Waiter', 'Busboy', 'Chief', 'Mechanic']

      let result = Math.floor((Math.random() * replies.length));
      let amount = Math.floor(Math.random() * 3000) + 1;
      let embed1 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> You worked as a ${replies[result]} and earned ${amount} coins`);
      message.channel.send(embed1)

      db.add(`money_${message.guild.id}_${user.id}`, amount)
      db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    };
  }
}
