const discord = require('discord.js')
const distube = require('distube')

module.exports.run = async (client, message, args) => {

    var embed12 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Please be sure to join a voice channel")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!message.member.voice.channel) return message.reply(embed12)

    var embed122 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Mention one of those options: \`[bassboost | 3d | echo | karaoke | nightcore | vaporwave]\`")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();

    var embed123 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Nothing to play right now")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();

    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(embed123)

    if (args[0] === "off" && queue.filter) client.distube.setFilter(message, queue.filter)
    else if (Object.keys(client.distube.filters).includes(args[0])) client.distube.setFilter(message, args[0])
    else if (args[0]) return message.channel.send(embed122)

    const embed1 = new discord.MessageEmbed()
        .setTitle("🔊 Filter")
        .setDescription("Current queue filter: " + (args[0] || "Off"))
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
    message.channel.send(embed1)

}

module.exports.help = {
    name: "filter",
    category: "Music",
    description: "Add a filter to a song",
    aliases: ["filter"]
}