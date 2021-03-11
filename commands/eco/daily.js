const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../../config/config.json`);
module.exports = {
  name: "daily",
  description: `to get money everyday`,
  aliases: [],
  cooldown: 3,
  edesc: `to get money everyday Usage: ${PREFIX}daily`,
  async execute(message, args, client) {


    let user = message.author;

    let timeout = 86400000;
    let amount = Math.floor(Math.random() * 500);

    let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));

      let timeEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Cross:618736602901905418> You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
      message.channel.send(timeEmbed)
    } else {
      let moneyEmbed = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> You've collected your daily reward of ${amount} coins`);
      message.channel.send(moneyEmbed)
      db.add(`money_${message.guild.id}_${user.id}`, amount)
      db.set(`daily_${message.guild.id}_${user.id}`, Date.now())


    }
  }
}


module.exports.help = {
  name: "daily",
  aliases: ["day"]
}