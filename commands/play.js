
const discord = require('discord.js')
const distube = require('distube')

module.exports.run = async (client, message, args) => {

    var embed1 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Please be sure to join a voice channel")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!message.member.voice.channel) return message.reply(embed1)
    const music = args.join(" ")
    var embed = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Mention a name of url")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!music) return message.channel.send(embed)
    client.distube.play(message, music)
}


module.exports.help = {
    name: "play",
    category: "Music",
    description: "Play a song",
    aliases: ["play"]
}