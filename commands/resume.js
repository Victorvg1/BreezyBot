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
    const queue = client.distube.getQueue(message)
    var embed123 = new discord.MessageEmbed()
        .setTitle("⚠ Error")
        .setDescription("Nothing to play right now")
        .setColor("RED")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (!queue) return message.channel.send(embed123)
    client.distube.resume(message)
    const embed12 = new discord.MessageEmbed()
        .setTitle('✅ • Succes')
        .setDescription(`Song is resumed`)
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
    message.channel.send(embed12)

}
module.exports.help = {
    name: "resume",
    category: "Music",
    description: "Resume a song",
    aliases: ["resume"]
}