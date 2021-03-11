const Discord = require('discord.js')
const db = require('quick.db')

const {
  PREFIX,
  approveemoji,
  denyemoji,
  ownerID
} = require(`../../config/config.json`);
module.exports = {
  name: "store",
  description: `to show store`,
  aliases: [],
  cooldown: 3,
  edesc: `to show store Usage: ${PREFIX}store `,
  async execute(message, args, client) {
    let prefix = await db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = PREFIX;

    let embed = new Discord.MessageEmbed()
      .setDescription(`**VIP Ranks**\n\nBronze: 3500 Coins [${prefix}buy bronze]\n\n**Lifestyle Items**\n\nFresh Nikes: 600 [${prefix}buy nikes]\nCar: 800 [${prefix}buy car]\nMansion: 1200 [${prefix}buy mansion]\nDrip: 20000 [${prefix}buy drip]`)
      .setColor("#FFFFFF")
    message.channel.send(embed)




  }
}


module.exports.help = {
  name: "store",
  aliases: ["st"]
}