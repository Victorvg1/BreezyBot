const discord = require('discord.js')
const distube = require('discord-music-player')
const db = require('quick.db')
module.exports.run = async (client, message, args) => {


    if (!message.member.voice.channel) {
        var embed12 = new discord.MessageEmbed()
            .setTitle("⚠ Error")
            .setDescription("Please be sure to join a voice channel")
            .setColor("RED")
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp();
        return message.channel.send(embed12)
    }

    const queue = client.distube.getQueue(message)
    var embed123 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Nothing to play right now")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!queue) return message.channel.send(embed123)
    let mode = null
    switch (args[0]) {
        case "off":
            mode = 0
            break
        case "song":
            mode = 1
            break
        case "queue":
            mode = 2
            break
    }
    mode = client.distube.setRepeatMode(message, mode)
    mode = mode ? mode === 2 ? "repeat queue" : "Repeat song" : "Off"

    var embed1234 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Mention on or off")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!args[0]) return message.channel.send(embed1234)
    const embed1 = new discord.MessageEmbed()
        .setTitle('✅ Succes')
        .setDescription(`The loop was set to ${mode}`)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
    message.channel.send(embed1)

}

module.exports.help = {
    name: "loop",
    category: "Music",
    description: "Loop a song",
    aliases: ["loop"]
}