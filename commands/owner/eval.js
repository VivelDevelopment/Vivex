const { Client, Collection, MessageEmbed } = require(`discord.js`);
const beautify = require('beautify')
const {
    PREFIX,
    approveemoji,
    denyemoji,
    ownerID
} = require(`../../config/config.json`);
module.exports = {
    name: `eval`,
    description: `eval commands works only with bot's owners`,
    aliases: ["e"],
    cooldown: 3,
    edesc: `Type this Command, to get eval command Usage: ${PREFIX}eval <code>`,
    async execute(message, args, client) {
        if (!ownerID.includes(message.author.id)) {
            return message.channel.send(new MessageEmbed().setTitle("you are not owner of this bot :x:").setFooter(`${client.user.username}`).setTimestamp())
                .then(m => m.delete(5000));
        }

        if (!args[0]) {
            return message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle(":x: No input ERROR").setDescription("Bruh man you didn't give me __**input**__!"))
                .then(m => m.delete(5000));
        }

        try {
            if (args.join(" ").toLowerCase().includes("token")) {
                return;
            }
            const toEval = args.join(" ");
            const evaluated = eval(toEval);
            message.channel.send(new MessageEmbed().setColor("#c219d8").setTimestamp().setFooter(client.user.username, client.user.displayAvatarURL).setTitle("Eval").addField("To evaluat:", `\`\`\`${beautify(args.join(" "), { format: 'js' })} \`\`\``).addField("Evaluated:", `\`\`\`${evaluated}\`\`\``).addField("Type of:", typeof (evaluated)))

        } catch (e) {
            message.channel.send(new MessageEmbed().setColor("#c219d8").setTitle(":x: ERROR!").setDescription(e).setFooter(client.user.username, client.user.displayAvatarURL))
        }
    }
}