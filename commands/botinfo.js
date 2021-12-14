const discord = require("discord.js");
const fs = require("fs")
const moment = require("moment");

module.exports.run = async (client, message, args) => {

    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60)

    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    const embed = new discord.MessageEmbed()
        .setTitle('📘 Bot-Info')
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        .setColor('#80C3FF')
        .addFields(
            {
                name: '🤖 Bot Name',
                value: `${client.user.username}`,
                inline: true
            },
            {
                name: '🖥️ Bot-Owner ',
                value: "<@796989030150438963> and <@729999870156603442>",
                inline: true
            },
            {
                name: '🆔 Bot ID',
                value: `${client.user.id}`,
                inline: true
            },
            {
                name: '💻 Total Commands',
                value: `${client.commands.size} commands`,
                inline: true
            },
            {
                name: '⏳ Latency',
                value: `${Date.now() - message.createdTimestamp}ms.`,
                inline: true
            },
            {
                name: "🏷️ Discord.js",
                value: `${require(`${process.cwd()}/package.json`).dependencies["discord.js"]}`,
                inline: true
            },

            {
                name: ':clock: Uptime',
                value: `${uptime}`,
                inline: true
            },

            {
                name: '⏲️ API Latency',
                value: `${Math.round(client.ws.ping)}ms`,
                inline: true
            },
            {
                name: '📅 Created',
                value: `${client.user.createdAt}`,
                inline: true
            }
        )

        message.channel.send(embed)
}

module.exports.help = {
    name: "botinfo",
    aliases: ["botinfo"],
    description: 'See info about the bot',
    category: 'Utility'
}