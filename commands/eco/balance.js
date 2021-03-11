const Discord = require("discord.js");
const db = require("quick.db");
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../../config/config.json`);
module.exports = {
  name: "balance",
  description: `Gives you a list of all help Commands`,
  aliases: ["bal"],
  cooldown: 3,
  edesc: `to get how much money you have Usage: ${PREFIX}balance or bal`,
  async execute(message, args, client) {
    let user = message.mentions.members.first() || message.author;

    let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
    if (bank === null) bank = 0;

    let moneyEmbed = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(`**${user}'s Balance**\n\nPocket: ${bal}\nBank: ${bank}`);
    message.channel.send(moneyEmbed)
  }
}

