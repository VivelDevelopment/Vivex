const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
    PREFIX,
    approveemoji,
    denyemoji
} = require(`../../config/config.json`);
const db = require('quick.db');

module.exports = {
    name: `help`,
    description: `Gives you a list of all help Commands`,
    aliases: ["h", "commands"],
    cooldown: 3,
    edesc: "Type help to get a short preview of all Commands, Type help <COMMANDNAME> to get extended information about this one command!",
    async execute(message, args, client) {

        let prefix = await db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = PREFIX;
        //react with approve emoji
        message.react("✅");
        //define the commands as a command
        let commands = message.client.commands.array();
        //define the help embed
        let helpEmbed = new MessageEmbed()
            .setTitle("Vivex Help")
            .setDescription(`**Version:** \`v0.1\` \n**PREFIX:** \`${PREFIX}\``)
            .setFooter(client.user.username + `Type: ${prefix}help <Command>  for more information!`)
            .setColor("#c219d8");
        //define argstrue to negative
        let ifargstruedothis = -1;

        switch (args[0]) {
            case "help":
                ifargstruedothis = 0;
                break;
            case "prefix":
                ifargstruedothis = 1;
                break;
            default:
                commands.forEach((cmd) => {
                    helpEmbed.addField(
                        `**${prefix}${cmd.name}**`,
                        `${cmd.description}`,
                        true
                    );
                });
                if (!message.guild) {
                    if (!args[0]) { message.react(approveemoji); return message.author.send(helpEmbed); }
                    return
                }
                message.react(approveemoji);
                message.author.send(new MessageEmbed().setColor("#c219d8")
                    .setDescription(`**👍 Sent from <#${message.channel.id}>**`))
                message.author.send(helpEmbed)
                message.channel.send(new MessageEmbed().setColor("#c219d8")
                    .setDescription(`**👍 ${message.author} Check your \`direct messages\` for a list of Commands!**`)
                );

                break;
        }

        if (ifargstruedothis >= 0) {
            let aliases = commands[ifargstruedothis].aliases;
            if (aliases === undefined || !aliases) aliases = "No Aliases!";
            let cooldown = commands[ifargstruedothis].cooldown;
            if (cooldown === undefined || !cooldown) cooldown = "No Cooldown!";


            helpEmbed.addField(
                `**${prefix}${commands[ifargstruedothis].name}**`,
                `\`\`\`fix\n${commands[ifargstruedothis].edesc}\n\`\`\`\n\`${commands[ifargstruedothis].description}\``
            );
            helpEmbed.addField(
                `**:notes: Aliases:**`,
                `\`${aliases}\``
            );
            helpEmbed.addField(
                `**:wrench: Cooldown:**`,
                `\`${cooldown}\``
            );
            if (!message.guild) return message.author.send(helpEmbed);
            message.author.send(helpEmbed)
            message.channel.send(new MessageEmbed().setColor("#c219d8")
                .setDescription(`**👍 ${message.author} Check your \`direct messages\` for a list of Commands!**`)
            );
        }

    }
}
