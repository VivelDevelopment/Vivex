const { Client, Collection, MessageEmbed, MessageFlags } = require(`discord.js`);
const {
    PREFIX,
    approveemoji,
    denyemoji
} = require(`../../config/config.json`);
const fetch = require('node-fetch')
module.exports = {
    name: `docs`,
    description: `eval commands works only with bot's owners`,
    aliases: ["discord.js", "discordjs", "djs"],
    cooldown: 3,
    edesc: `Type this Command, to get eval command Usage: ${PREFIX}eval <code>`,
    async execute(message, args, client) {

        const url = `https://djsdocs.sorta.moe/v2/embed?src=master&q=${encodeURIComponent(args)}`;

        fetch(url)
            .then(res => res.json())
            .then(embed => {
                if (embed && !embed.error) {

                    message.channel.send({ embed: embed })

                } else {
                    message.channel.send(`No results found for **${args}**`)
                }
            })
            .catch(e => {
                console.log(e);
                message.channel.send(`There was a error`)
            })
    }
}
