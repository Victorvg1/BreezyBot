
const discord = require('discord.js')
const distube = require('distube')
module.exports.run = async (client, message, args) => {

    var embed = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Join a vc to use this command")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()

    if (!message.member.voice.channel) return message.reply(embed)
    const queue = client.distube.getQueue(message)
    var embed1 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Nothing is playing right now")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
    if (!queue) return message.channel.send(embed1)
    client.distube.skip(message)
    var embed2 = new discord.MessageEmbed()
        .setTitle("✅ Succes")
        .setDescription("Song is skipped")
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
    message.channel.send(embed2)

}
module.exports.help = {
    name: "skip",
    category: "Music",
    description: "Skip a song",
    aliases: ["skip"]
}