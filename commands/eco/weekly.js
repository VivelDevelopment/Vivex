const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

const {
  PREFIX,
  approveemoji,
  denyemoji,
  ownerID
} = require(`../../config/config.json`);
module.exports = {
  name: "weekly",
  description: `get monet weekly`,
  aliases: [],
  cooldown: 3,
  edesc: `to get monet weeklt Usage: ${PREFIX}weekly `,
  async execute(message, args, client) {

    let user = message.author;
    let timeout = 604800000;
    let amount = Math.floor(Math.random() * 3000);

    let weekly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

    if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
      let time = ms(timeout - (Date.now() - weekly));

      let timeEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Cross:618736602901905418> You have already collected your weekly reward\n\nCollect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `);
      message.channel.send(timeEmbed)
    } else {
      let moneyEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> You've collected your weekly reward of ${amount} coins`);
      message.channel.send(moneyEmbed)
      db.add(`money_${message.guild.id}_${user.id}`, amount)
      db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())


    }
  }
}