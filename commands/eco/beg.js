const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../../config/config.json`);
module.exports = {
  name: "beg",
  description: `Gives you some money :))`,
  aliases: [],
  cooldown: 3,
  edesc: `Type beg to get some money Usage: ${PREFIX}balance or bal`,
  async execute(message, args, client) {
    let user = message.author;

    let timeout = 300000;
    let amount = Math.floor(Math.random() * 1000);

    let beg = await db.fetch(`beg_${message.guild.id}_${user.id}`);

    if (beg !== null && timeout - (Date.now() - beg) > 0) {
      let time = ms(timeout - (Date.now() - beg));

      let timeEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Cross:618736602901905418> You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `);
      message.channel.send(timeEmbed)
    } else {
      let moneyEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> You've begged and received ${amount} coins`);
      message.channel.send(moneyEmbed)
      db.add(`money_${message.guild.id}_${user.id}`, amount)
      db.set(`beg_${message.guild.id}_${user.id}`, Date.now())


    }
  }
}
