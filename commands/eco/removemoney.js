const Discord = require("discord.js");
const db = require("quick.db");

const {
  PREFIX,
  approveemoji,
  denyemoji,
  ownerID
} = require(`../../config/config.json`);
module.exports = {
  name: "remove-money",
  description: `to remove ppl money`,
  aliases: ["rvm"],
  cooldown: 3,
  edesc: `to remove ppl money Usage: ${PREFIX}remove-money <@user> <money>`,
  async execute(message, args, client) {
    if (!ownerID.includes(message.author.id)) {
      return message.channel.send(new MessageEmbed().setTitle("you are not owner of this bot to remove ppl money :x:").setFooter(`${client.user.username}`).setTimestamp())
        .then(m => m.delete(5000));
    }

    let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.subtract(`money_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.MessageEmbed()
      .setColor("#FFFFFF")
      .setDescription(`<:Check:618736570337591296> Removed ${args[1]} coins\n\nNew Balance: ${bal}`);
    message.channel.send(moneyEmbed)

  }
}
