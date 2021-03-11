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
            .setDescription(`**Version:** \`v0.2\` \n**ORIGINAL PREFIX:** \`${PREFIX}\` \n**SERVER PREFIX:** \`${prefix}\` `)
            .setFooter(client.user.username + `Type: ${prefix}help <Command>  for more information!`)
            .setColor("#c219d8");
        //define argstrue to negative
        let ifargstruedothis = -1;

        switch (args[0]) {
<<<<<<< Updated upstream
               case "ban":
=======
            case "balance":
>>>>>>> Stashed changes
                ifargstruedothis = 0;
                break
            case "beg":
                ifargstruedothis = 1;
                break;
            case "buy":
                ifargstruedothis = 2;
                break;
            case "daily":
                ifargstruedothis = 3;
                break;
            case "deposit":
                ifargstruedothis = 4;
                break;
            case "leaderboard":
                ifargstruedothis = 5;
                break;
            case "pay":
                ifargstruedothis = 6;
                break;
            case "profile":
                ifargstruedothis = 7;
                break;
            case "removemoney":
                ifargstruedothis = 8;
                break;
            case "rob":
                ifargstruedothis = 9;
                break;
            case "roulette":
                ifargstruedothis = 10;
                break;
            case "sell":
                ifargstruedothis = 11;
                break;
            case "slots":
                ifargstruedothis = 12;
                break;
            case "store":
                ifargstruedothis = 13;
                break;
            case "store2":
                ifargstruedothis = 14;
                break;
            case "weekly":
                ifargstruedothis = 15;
                break;
            case "withdraw":
                ifargstruedothis = 16;
                break;
            case "work":
                ifargstruedothis = 17;
                break;
            case "help":
                ifargstruedothis = 18;
                break;
            case "docs":
                ifargstruedothis = 19;
                break;
            case "ban":
                ifargstruedothis = 20;
                break;
            case "kick":
                ifargstruedothis = 21;
                break;
<<<<<<< Updated upstream
            case "kick":
                ifargstruedothis = 1;
                break;
             case "prefix":
                ifargstruedothis = 2;
                break;
            case "snipe":
                ifargstruedothis = 3;
                break;
            case "unban":
                ifargstruedothis = 3;
=======
            case "prefix":
                ifargstruedothis = 22;
                break;
            case "snipe":
                ifargstruedothis = 23;
                break;
            case "unban":
                ifargstruedothis = 24;
                break;
            case "warn":
                ifargstruedothis = 25;
                break;
            case "eval":
                ifargstruedothis = 26;
>>>>>>> Stashed changes
                break;
            case "warn":
                ifargstruedothis = 4;
                break;
            case "help":
                ifargstruedothis = 5;
                break;
            case "docs":
                ifargstruedothis = 6;
                break;
            case "eval":
                ifargstruedothis = 7;
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
